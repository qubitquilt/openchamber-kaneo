import { test } from "node:test";
import assert from "node:assert/strict";

import { read, write } from "../build/storage.mjs";

function mockStore() {
  const data = new Map();
  return {
    get: async (key) => data.get(key),
    set: async (key, value) => data.set(key, value),
    delete: async (key) => data.delete(key),
    snapshot: () => new Map(data),
  };
}

test("read returns sanitized value from mock store", async () => {
  const store = mockStore();
  await store.set("test", "hello");
  const result = await read("test", (raw) => (typeof raw === "string" ? raw : "fallback"), store);
  assert.equal(result, "hello");
});

test("read returns sanitized fallback when store is empty", async () => {
  const store = mockStore();
  const result = await read(
    "missing",
    (raw) => (typeof raw === "string" ? raw : "fallback"),
    store,
  );
  assert.equal(result, "fallback");
});

test("write strips non-JSON values before storing", async () => {
  const store = mockStore();
  const payload = { a: 1, fn: () => {}, missing: undefined };
  await write("stripped", payload, store);
  const value = await store.get("stripped");
  assert.deepStrictEqual(value, { a: 1 });
});

test("read passes identity sanitizer unchanged", async () => {
  const store = mockStore();
  await store.set("raw", { b: 2, extra: "value" });
  const result = await read("raw", (raw) => raw, store);
  assert.deepStrictEqual(result, { b: 2, extra: "value" });
});

test("read warns on store failure and returns fallback", async () => {
  const badStore = {
    get: async () => {
      throw new Error("store broken");
    },
    set: async () => {},
    delete: async () => {},
  };
  const result = await read("bad", (raw) => (raw === undefined ? "default" : "other"), badStore);
  assert.equal(result, "default");
});

test("write warns on store failure", async () => {
  const badStore = {
    get: async () => undefined,
    set: async () => {
      throw new Error("write broken");
    },
    delete: async () => {},
  };
  await assert.doesNotReject(async () => await write("bad", { a: 1 }, badStore));
});
