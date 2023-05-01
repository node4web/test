import test from "./test";
import run from "./run";
import after from "./after";
import afterEach from "./afterEach";
import before from "./before";
import beforeEach from "./beforeEach";
import describe from "./describe";
import it from "./it";
import mock from "./mock";

// Both of these forms need to work:
//
//   import * as test from "node:test";
//   test(...);
//   test.describe(...);
//
//   import test from "node:test";
//   test(...);
//   test.describe(...);

// We do this inline to get the type inference to work correctly.
// Object.assign() returns the same object as in $1, but cast as the T & U type,
// which is what we want. In essence, this just adds the extra properties to
// the object and returns it, but in the processes returns the correct combined
// type. This means that consumers will get the right type inference.
export default Object.assign(test, {
  after,
  afterEach,
  before,
  beforeEach,
  describe,
  it,
  run,
  test,
  mock,
});
export { after, afterEach, before, beforeEach, describe, it, run, test, mock };
