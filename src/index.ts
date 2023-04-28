import test from "./test";
import run from "./run";
import after from "./after";
import afterEach from "./afterEach";
import before from "./before";
import beforeEach from "./beforeEach";
import describe from "./describe";
import it from "./it";

Object.assign(test, {
  after,
  afterEach,
  before,
  beforeEach,
  describe,
  it,
  run,
  test,
});

export default test;
export { after, afterEach, before, beforeEach, describe, it, run, test };
