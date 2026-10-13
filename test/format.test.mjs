import { test } from "node:test";
import assert from "node:assert/strict";

import {
  firstLine,
  dueLabel,
  isOverdue,
  priorityLabel,
  taskContext,
  taskSummary,
  taskToMarkdown,
  ticketIdOf,
} from "../build/format.mjs";

test("ticketIdOf uppercases the project slug and appends the number", () => {
  assert.equal(ticketIdOf("gen", 4), "GEN-4");
  assert.equal(ticketIdOf("QQW", 123), "QQW-123");
});

test("ticketIdOf falls back to the bare slug when there is no number", () => {
  assert.equal(ticketIdOf("gen", null), "GEN");
  assert.equal(ticketIdOf("gen", undefined), "GEN");
});

test("dueLabel describes today, tomorrow and overdue in words", () => {
  const today = new Date(2026, 0, 15, 18, 0);
  const iso = (day) => new Date(2026, 0, day, 12, 0).toISOString();

  assert.equal(dueLabel(iso(15), today), "Due today");
  assert.equal(dueLabel(iso(16), today), "Due tomorrow");
  assert.equal(dueLabel(iso(14), today), "Due yesterday");
  assert.equal(dueLabel(iso(12), today), "Overdue 3d");
  assert.equal(dueLabel(iso(20), today), "Due in 5d");
});

test("dueLabel falls back to a date beyond a week and tolerates junk", () => {
  const today = new Date(2026, 0, 15);
  const far = new Date(2026, 2, 3, 12, 0).toISOString();
  assert.match(dueLabel(far, today) ?? "", /^Due /);
  assert.equal(dueLabel(null), null);
  assert.equal(dueLabel("not-a-date"), null);
});

test("isOverdue ignores the time of day", () => {
  const today = new Date(2026, 0, 15, 9, 0);
  assert.equal(isOverdue(new Date(2026, 0, 14, 23, 59).toISOString(), today), true);
  assert.equal(isOverdue(new Date(2026, 0, 15, 0, 1).toISOString(), today), false);
  assert.equal(isOverdue(new Date(2026, 0, 16, 12, 0).toISOString(), today), false);
  assert.equal(isOverdue(null), false);
});

test("priorityLabel names every priority the API accepts", () => {
  assert.equal(priorityLabel("no-priority"), "None");
  assert.equal(priorityLabel("low"), "Low");
  assert.equal(priorityLabel("medium"), "Medium");
  assert.equal(priorityLabel("high"), "High");
  assert.equal(priorityLabel("urgent"), "Urgent");
});

test("firstLine takes the first non-empty line and drops Markdown heading marks", () => {
  assert.equal(firstLine(""), "");
  assert.equal(firstLine(null), "");
  assert.equal(firstLine("\n\n  \n"), "");
  assert.equal(firstLine("## Fix login\nmore text"), "Fix login");
  assert.equal(firstLine("> quoted line"), "quoted line");
  assert.equal(firstLine("* bulleted"), "bulleted");
});

test("firstLine truncates with an ellipsis instead of cutting mid-word", () => {
  const text = "x".repeat(200);
  const result = firstLine(text, 20);
  assert.equal(result.length, 20);
  assert.ok(result.endsWith("…"));
});

test("taskSummary joins assignee, labels, due date and subtask progress", () => {
  const summary = taskSummary({
    id: "t1",
    projectId: "p1",
    title: "Fix login",
    number: 4,
    description: null,
    status: "to-do",
    priority: "high",
    createdAt: "2026-01-01T00:00:00.000Z",
    assigneeName: "Michael",
    labels: [{ id: "l1", name: "bug", color: "red" }],
    // Due dates are relative to the wall clock, so assert the shape of the
    // joined line rather than the wording of the date part.
    dueDate: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    subtaskCounts: { completed: 1, total: 3 },
  });
  assert.equal(summary, "Michael · bug · Due in 3d · 1/3 subtasks");
});

test("taskSummary stays empty when a task carries nothing extra", () => {
  const summary = taskSummary({
    id: "t1",
    projectId: "p1",
    title: "Plain",
    number: 1,
    description: null,
    status: "to-do",
    priority: "no-priority",
    createdAt: "2026-01-01T00:00:00.000Z",
  });
  assert.equal(summary, "");
});

test("taskToMarkdown leads with the ticket and keeps the link and body", () => {
  const markdown = taskToMarkdown(
    {
      id: "t1",
      projectId: "p1",
      title: "Fix login",
      number: 4,
      description: "It throws on empty input.",
      status: "to-do",
      priority: "urgent",
      createdAt: "2026-01-01T00:00:00.000Z",
      assigneeName: "Michael",
    },
    { ticketId: "GEN-4", columnName: "To Do", url: "https://kaneo.example/x" },
  );

  assert.match(markdown, /^\*\*GEN-4\*\* Fix login/);
  assert.match(markdown, /Status: To Do · Priority: Urgent · Assignee: Michael/);
  assert.match(markdown, /https:\/\/kaneo\.example\/x/);
  assert.match(markdown, /It throws on empty input\./);
});

test("taskToMarkdown leaves out a priority the task does not have", () => {
  const markdown = taskToMarkdown(
    {
      id: "t1",
      projectId: "p1",
      title: "Plain",
      number: 1,
      description: null,
      status: "to-do",
      priority: "no-priority",
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    { ticketId: "GEN-1" },
  );
  assert.doesNotMatch(markdown, /Priority/);
});

test("taskContext is the text the model reads from an attached chip", () => {
  const context = taskContext(
    {
      id: "t1",
      projectId: "p1",
      title: "Fix login",
      number: 4,
      description: "It throws on empty input.",
      status: "to-do",
      priority: "high",
      dueDate: "2026-02-01T00:00:00.000Z",
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    {
      ticketId: "GEN-4",
      projectName: "General",
      columnName: "To Do",
      url: "https://kaneo.example/x",
    },
  );

  assert.match(context, /^Kaneo task GEN-4: Fix login/);
  assert.match(context, /Project: General/);
  assert.match(context, /Status: To Do/);
  assert.match(context, /Priority: High/);
  assert.match(context, /Due: 2026-02-01/);
  assert.ok(context.indexOf("https://kaneo.example/x") < context.indexOf("It throws"));
});

import {
  branchForTicket,
  columnGlyphOf,
  relativeTimeOf,
  sessionComment,
} from "../build/format.mjs";

test("relativeTimeOf buckets like the reference rows", () => {
  const now = Date.parse("2026-10-13T12:00:00.000Z");
  const ago = (ms) => new Date(now - ms).toISOString();
  assert.equal(relativeTimeOf(ago(30_000), now), "just now");
  assert.equal(relativeTimeOf(ago(5 * 60_000), now), "5m");
  assert.equal(relativeTimeOf(ago(3 * 3_600_000), now), "3h");
  assert.equal(relativeTimeOf(ago(2 * 86_400_000), now), "2d");
  assert.equal(relativeTimeOf(ago(10 * 7 * 86_400_000), now), "10w");
  assert.equal(relativeTimeOf(null, now), null);
  assert.equal(relativeTimeOf("not-a-date", now), null);
});

test("columnGlyphOf maps the default Kaneo columns", () => {
  assert.equal(columnGlyphOf({ slug: "to-do", isFinal: false }), "blank");
  assert.equal(columnGlyphOf({ slug: "in-progress", isFinal: false }), "progress");
  assert.equal(columnGlyphOf({ slug: "in-review", isFinal: false }), "review");
  assert.equal(columnGlyphOf({ slug: "done", isFinal: true }), "done");
  assert.equal(columnGlyphOf({ slug: "shipped", isFinal: true }), "done");
  assert.equal(columnGlyphOf({ slug: "custom", isFinal: false }), "blank");
});

test("branchForTicket is a git-safe kaneo/ branch name", () => {
  assert.equal(branchForTicket("GEN-4"), "kaneo/gen-4");
  assert.equal(branchForTicket("BOOP-416"), "kaneo/boop-416");
  assert.equal(branchForTicket(""), "kaneo/task");
});

test("sessionComment is one link when a web URL is configured", () => {
  assert.equal(
    sessionComment("started", "Fix login", "https://openchamber.example", "ses_1"),
    "[OpenChamber session started](https://openchamber.example/?session=ses_1) — Fix login",
  );
  assert.equal(
    sessionComment("completed", "Fix login", "https://openchamber.example/", "ses_1"),
    "[OpenChamber session completed](https://openchamber.example/?session=ses_1) — Fix login",
  );
  assert.equal(sessionComment("failed", "Fix login"), "OpenChamber session failed — Fix login");
  assert.equal(
    sessionComment("completed", "  ", "https://oc.example", "s1"),
    "[OpenChamber session completed](https://oc.example/?session=s1) — Untitled session",
  );
});
