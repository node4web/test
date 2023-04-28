import assert from "assert";
import test from "../src/index";

test("sync nothing", () => {});

test("sync error", () => {
  throw new Error();
});

test("sync assert success", () => {
  assert(true);
});

test("sync assert error", () => {
  assert(false);
});
