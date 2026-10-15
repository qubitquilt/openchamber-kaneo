import { test } from "node:test";
import assert from "node:assert/strict";

import { read, write } from "../build/storage.mjs";

function mockStore() {
  const data = new Map();
  return {
    get: async (key) => data.get(key),
    set: async (key, value) => data.set(key, value),
    delete: async (key) => data.delete(key),
    _data: () => new Map(data),
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

test("write stores plain JSON in mock store", async () => {
  const store = mockStore();
  await write("key", { a: 1 }, store);
  const value = await store.get("key");
  assert.deepStrictEqual(value, { a: 1 });
});

test("read logs silently but returns fallback on store failure", async () => {
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
