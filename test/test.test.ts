import { test, expect, assert, expectTypeOf, assertType } from "vitest";
import nodeTest from "../src/test";

test("String() returns a string", () => {
  assertType<number>(String());
});
