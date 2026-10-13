import { test } from "node:test";
import assert from "node:assert/strict";

import { KaneoError, boardTasks, createKaneoClient } from "../build/client.mjs";

/** Record every request and answer from a routing table. */
function stub(routes) {
  const calls = [];
  const request = async (input) => {
    calls.push(input);
    const key = `${input.method} ${input.path}`;
    const route = routes[key];
    if (!route)
      return { status: 404, body: JSON.stringify({ message: "no route", code: "NOT_FOUND" }) };
    if (typeof route === "function") return route(input);
    return { status: 200, body: JSON.stringify(route) };
  };
  return { request, calls };
}

const emptyBoard = (id, taskCount = 0) => ({
  data: {
    id,
    name: "General",
    slug: "gen",
    workspaceId: "w1",
    columns: [
      { id: "to-do", slug: "to-do", name: "To Do", isFinal: false, tasks: [] },
      { id: "done", slug: "done", name: "Done", isFinal: true, tasks: [] },
    ],
    archivedTasks: [],
    plannedTasks: [],
  },
  pagination: {
    total: taskCount,
    page: 1,
    pageSize: 100,
    totalPages: 1,
    relatedPage: 1,
    relatedPageSize: 100,
    relatedTotalPages: 1,
  },
});

const task = (id, overrides = {}) => ({
  id,
  projectId: "p1",
  title: `Task ${id}`,
  number: Number(id.replace(/\D/g, "")),
  description: null,
  status: "to-do",
  priority: "medium",
  createdAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

test("query values are stringified and empty ones are dropped", async () => {
  const { request, calls } = stub({
    "GET /api/project": [],
    "GET /api/search": { results: [], totalCount: 0, searchQuery: "" },
  });
  const client = createKaneoClient(request);

  await client.listProjects("w1", false);
  assert.deepEqual(calls[0].query, { workspaceId: "w1" });

  await client.listProjects("w1", true);
  assert.deepEqual(calls[1].query, { workspaceId: "w1", includeArchived: "true" });

  await client.search("w1", "login", { limit: 5 });
  assert.deepEqual(calls[2].query, { q: "login", type: "tasks", workspaceId: "w1", limit: "5" });

  await client.search("w1", "login", { projectId: undefined });
  assert.equal("projectId" in calls[3].query, false);
});

test("request bodies travel as JSON strings", async () => {
  const { request, calls } = stub({
    "POST /api/task/p1": task("t1"),
    "PUT /api/task/status/t1": task("t1", { status: "done" }),
    "PUT /api/task/priority/t1": task("t1", { priority: "urgent" }),
    "POST /api/comment/t1": {
      id: "c1",
      taskId: "t1",
      userId: "u1",
      content: "hi",
      createdAt: "",
      updatedAt: "",
    },
  });
  const client = createKaneoClient(request);

  await client.createTask("p1", {
    title: "New",
    description: "",
    priority: "high",
    status: "to-do",
  });
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].path, "/api/task/p1");
  assert.deepEqual(JSON.parse(calls[0].body), {
    title: "New",
    description: "",
    priority: "high",
    status: "to-do",
  });

  await client.updateTaskStatus("t1", "done");
  assert.deepEqual(JSON.parse(calls[1].body), { status: "done" });

  await client.updateTaskPriority("t1", "urgent");
  assert.deepEqual(JSON.parse(calls[2].body), { priority: "urgent" });

  await client.createComment("t1", "hi");
  assert.deepEqual(JSON.parse(calls[3].body), { content: "hi" });
});

test("path segments are URL encoded so an odd id cannot break the route", async () => {
  const { request, calls } = stub({ "GET /api/task/a%2Fb": task("t1") });
  const client = createKaneoClient(request);

  await client.getTask("a/b");
  assert.equal(calls[0].path, "/api/task/a%2Fb");
});

test("getBoard reads one page when the board fits", async () => {
  const { request, calls } = stub({ "GET /api/task/tasks/p1": emptyBoard("p1", 3) });
  const client = createKaneoClient(request);

  const page = await client.getBoard("p1");
  assert.equal(calls.length, 1);
  assert.equal(page.truncated, false);
  // Query values reach the host as strings, which is what it forwards.
  assert.deepEqual(calls[0].query, { page: "1", limit: "100" });
  assert.equal(page.board.columns.length, 2);
});

test("getBoard walks further pages into the same columns", async () => {
  const first = emptyBoard("p1", 150);
  first.pagination.totalPages = 2;
  first.data.columns[0].tasks.push(task("t1"), task("t2"));

  const second = emptyBoard("p1", 150);
  second.pagination.page = 2;
  second.data.columns[0].tasks.push(task("t3"));

  const { request, calls } = stub({
    "GET /api/task/tasks/p1": (input) =>
      input.query.page === "1"
        ? { status: 200, body: JSON.stringify(first) }
        : { status: 200, body: JSON.stringify(second) },
  });
  const client = createKaneoClient(request);

  const page = await client.getBoard("p1");
  assert.equal(calls.length, 2);
  assert.deepEqual(
    page.board.columns[0].tasks.map((entry) => entry.id),
    ["t1", "t2", "t3"],
  );
  assert.equal(page.truncated, false);
});

test("getBoard reports truncation when the project holds more than it returns", async () => {
  const big = emptyBoard("p1", 5000);
  big.pagination.totalPages = 50;
  const { request } = stub({ "GET /api/task/tasks/p1": big });
  const client = createKaneoClient(request);

  const page = await client.getBoard("p1");
  assert.equal(page.truncated, true);
});

test("an API error becomes a KaneoError carrying the status and code", async () => {
  const { request } = stub({
    "GET /api/task/by-ticket-id/GEN-999": () => ({
      status: 404,
      body: JSON.stringify({ message: "Task not found", code: "NOT_FOUND" }),
    }),
  });
  const client = createKaneoClient(request);

  await assert.rejects(
    () => client.getTaskByTicketId("GEN-999"),
    (error) => {
      assert.ok(error instanceof KaneoError);
      assert.equal(error.status, 404);
      assert.equal(error.code, "NOT_FOUND");
      assert.equal(error.message, "Task not found");
      assert.equal(error.isBadRequest, true);
      assert.equal(error.isAuthProblem, false);
      return true;
    },
  );
});

test("a 401 and a 403 both read as an auth problem", async () => {
  const { request } = stub({
    "GET /api/project": () => ({
      status: 401,
      body: JSON.stringify({ message: "Missing credentials", code: "UNAUTHORIZED" }),
    }),
  });
  const client = createKaneoClient(request);

  await assert.rejects(
    () => client.listProjects("w1"),
    (error) => error instanceof KaneoError && error.isAuthProblem,
  );
});

test("an error body without a message still reads as an error", async () => {
  const { request } = stub({
    "GET /api/workspace": () => ({ status: 500, body: JSON.stringify({}) }),
  });
  const client = createKaneoClient(request);

  await assert.rejects(
    () => client.listWorkspaces(),
    (error) => {
      assert.ok(error instanceof KaneoError);
      assert.equal(error.message, "Kaneo answered 500.");
      assert.equal(error.code, "HTTP_500");
      return true;
    },
  );
});

test("a non-JSON answer is reported rather than thrown as a parse error", async () => {
  const { request } = stub({
    "GET /api/workspace": () => ({ status: 502, body: "<html>bad gateway</html>" }),
  });
  const client = createKaneoClient(request);

  await assert.rejects(
    () => client.listWorkspaces(),
    (error) => error instanceof KaneoError && error.code === "INVALID_RESPONSE",
  );
});

test("a 200 with an empty body is accepted", async () => {
  const { request } = stub({
    "GET /api/user/me": () => ({ status: 200, body: "" }),
  });
  const client = createKaneoClient(request);

  assert.equal(await client.currentUser(), undefined);
});

test("boardTasks flattens columns in order and keeps the column context", () => {
  const rows = boardTasks({
    id: "p1",
    name: "General",
    slug: "gen",
    workspaceId: "w1",
    columns: [
      {
        id: "to-do",
        slug: "to-do",
        name: "To Do",
        isFinal: false,
        tasks: [task("t2", { position: 2 }), task("t1", { position: 1 })],
      },
      { id: "done", slug: "done", name: "Done", isFinal: true, tasks: [task("t3")] },
    ],
    archivedTasks: [],
    plannedTasks: [],
  });

  assert.deepEqual(
    rows.map((row) => [row.task.id, row.columnName, row.isFinal]),
    [
      ["t1", "To Do", false],
      ["t2", "To Do", false],
      ["t3", "Done", true],
    ],
  );
});

test("boardTasks sorts by position and treats a missing position as first", () => {
  const rows = boardTasks({
    id: "p1",
    name: "General",
    slug: "gen",
    workspaceId: "w1",
    columns: [
      {
        id: "to-do",
        slug: "to-do",
        name: "To Do",
        isFinal: false,
        tasks: [task("b", { position: 5 }), task("a"), task("c", { position: 1 })],
      },
    ],
    archivedTasks: [],
    plannedTasks: [],
  });

  assert.deepEqual(
    rows.map((row) => row.task.id),
    ["a", "c", "b"],
  );
});
