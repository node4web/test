import test from "@jcbhmr/node-test";
import assert from "node:assert";

test("has document and window", () => {
  assert.strictEqual(typeof document, "object");
  assert.strictEqual(typeof window, "object");
});
