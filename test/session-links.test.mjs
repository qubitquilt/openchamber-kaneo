import { test } from "node:test";
import assert from "node:assert/strict";

import { pruneSessionLinks, sanitizeSessionLinks } from "../build/session-links.mjs";

const link = (at, overrides = {}) => ({
  taskId: `t${at}`,
  ticketId: `GEN-${at}`,
  title: `Task ${at}`,
  at,
  posted: [],
  ...overrides,
});

test("sanitizeSessionLinks reads well-formed links", () => {
  const links = sanitizeSessionLinks({ s1: link(1) });
  assert.deepEqual(links.s1, {
    taskId: "t1",
    ticketId: "GEN-1",
    title: "Task 1",
    at: 1,
    posted: [],
  });
});

test("sanitizeSessionLinks drops entries without a task and repairs fields", () => {
  const links = sanitizeSessionLinks({
    missing: { title: "no task" },
    junk: null,
    repaired: { taskId: "t2", ticketId: 5, title: null, at: "soon", posted: ["started", 3] },
  });
  assert.deepEqual(Object.keys(links).sort(), ["repaired"]);
  assert.deepEqual(links.repaired, {
    taskId: "t2",
    ticketId: "",
    title: "",
    at: 0,
    posted: ["started"],
  });
});

test("sanitizeSessionLinks tolerates anything that is not an object", () => {
  assert.deepEqual(sanitizeSessionLinks(null), {});
  assert.deepEqual(sanitizeSessionLinks("nope"), {});
  assert.deepEqual(sanitizeSessionLinks(undefined), {});
});

test("pruneSessionLinks keeps the newest and drops the oldest", () => {
  const links = { a: link(1), b: link(3), c: link(2) };
  const kept = pruneSessionLinks(links, 2);
  assert.deepEqual(Object.keys(kept).sort(), ["b", "c"]);
});

test("pruneSessionLinks drops the oldest link past the cap", () => {
  const links = { a: link(1), b: link(2) };
  const kept = pruneSessionLinks(links, 1);
  assert.deepEqual(Object.keys(kept), ["b"]);
});
