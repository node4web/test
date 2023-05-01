import normalizeTestArgs from "./internal/normalizeTestArgs";
import type TestOptions from "./TestOptions";

/**
 * The function under test. The first argument to this function is a TestContext
 * object. If the test uses callbacks, the callback function is passed as the
 * second argument. Default: A no-op function.
 *
 * @see https://nodejs.org/api/test.html#testname-options-fn
 */
type TestBlock = (t: TestContext, done: (result?: any) => void) => any;

/**
 * The test() function is the value imported from the test module. Each
 * invocation of this function results in reporting the test to the
 * `TestsStream`.
 *
 * The TestContext object passed to the fn argument can be used to perform
 * actions related to the current test. Examples include skipping the test,
 * adding additional diagnostic information, or creating subtests.
 *
 * `test()` returns a Promise that resolves once the test completes. if `test()`
 * is called within a `describe()` block, it resolve immediately. The return
 * value can usually be discarded for top level tests. However, the return value
 * from subtests should be used to prevent the parent test from finishing first
 * and cancelling the subtest as shown in the following example.
 *
 * ```js
 * test("top level test", async (t) => {
 *   // The setTimeout() in the following subtest would cause it to outlive its
 *   // parent test if 'await' is removed on the next line. Once the parent test
 *   // completes, it will cancel any outstanding subtests.
 *   await t.test("longer running subtest", async (t) => {
 *     return new Promise((resolve, reject) => {
 *       setTimeout(resolve, 1000);
 *     });
 *   });
 * });
 * ```
 *
 * The timeout option can be used to fail the test if it takes longer than
 * timeout milliseconds to complete. However, it is not a reliable mechanism for
 * canceling tests because a running test might block the application thread and
 * thus prevent the scheduled cancellation.
 *
 * @param name The name of the test, which is displayed when reporting test
 *   results. Default: The name property of fn, or `<anonymous>` if fn does not
 *   have a name.
 * @param options Configuration options for the test.
 * @param fn The function under test. The first argument to this function is a
 *   TestContext object. If the test uses callbacks, the callback function is
 *   passed as the second argument. Default: A no-op function.
 * @returns Resolved with undefined once the test completes, or immediately if
 *   the test runs within describe().
 * @see https://nodejs.org/api/test.html#testname-options-fn
 */
async function test(): Promise<void>;
async function test(name: string): Promise<void>;
async function test(options: TestOptions): Promise<void>;
async function test(fn: TestBlock): Promise<void>;
async function test(name: string, options: TestOptions): Promise<void>;
async function test(name: string, fn: TestBlock): Promise<void>;
async function test(options: TestOptions, fn: TestBlock): Promise<void>;
async function test(
  name: string,
  options: TestOptions,
  fn: TestBlock
): Promise<void>;
async function test(
  nameOrOptionsOrFn?: string | TestOptions | TestBlock,
  optionsOrFn?: TestOptions | TestBlock,
  fn_?: TestBlock
): Promise<void> {
  const { name, options, fn } = normalizeTestArgs(
    // TODO: Fix this type error
    // @ts-ignore
    nameOrOptionsOrFn,
    optionsOrFn,
    fn_
  );
  const { concurrency, only, skip, todo, signal, timeout } = options;

  console.debug(
    "test()",
    name,
    { concurrency, only, signal, skip, todo, timeout },
    fn
  );
}

export default test;
export { TestBlock };
