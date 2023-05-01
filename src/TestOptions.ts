/** @see https://nodejs.org/api/test.html#testname-options-fn */
interface TestOptions {
  /**
   * **If a number is provided:** That's the number of parallel `<iframe>`s to
   * use when running the tests.
   *
   * **If a boolean is provided:** If `true`, then we sniff the
   * `navigator.hardwareConcurrency` value and use that.
   *
   * @defaultValue false
   * @see https://nodejs.org/api/test.html#testname-options-fn
   */
  concurrency?: number | boolean;

  /**
   * If truthy, and the test context is configured to run only tests, then this
   * test will be run. Otherwise, the test is skipped. Default: false.
   *
   * @see https://nodejs.org/api/test.html#testname-options-fn
   */
  only?: boolean;

  /**
   * Allows aborting an in-progress test.
   *
   * @see https://nodejs.org/api/test.html#testname-options-fn
   */
  signal?: AbortSignal;

  // skip <boolean> | <string> If truthy, the test is skipped. If a string is provided, that string is displayed in the test results as the reason for skipping the test. Default: false.
  // todo <boolean> | <string> If truthy, the test marked as TODO. If a string is provided, that string is displayed in the test results as the reason why the test is TODO. Default: false.
  // timeout <number> A number of milliseconds the test will fail after. If unspecified, subtests inherit this value from their parent. Default: Infinity.

  /**
   * If truthy, the test is skipped. If a string is provided, that string is
   * displayed in the test results as the reason for skipping the test. Default:
   * false.
   *
   * @see https://nodejs.org/api/test.html#testname-options-fn
   */
  skip?: boolean | string;

  /**
   * If truthy, the test marked as TODO. If a string is provided, that string is
   * displayed in the test results as the reason why the test is TODO. Default:
   * false.
   *
   * @see https://nodejs.org/api/test.html#testname-options-fn
   */
  todo?: boolean | string;

  /**
   * A number of milliseconds the test will fail after. If unspecified, subtests
   * inherit this value from their parent. Default: Infinity.
   *
   * @see https://nodejs.org/api/test.html#testname-options-fn
   */
  timeout?: number;
}

export type { TestOptions as default };
