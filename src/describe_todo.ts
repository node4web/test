import type TestOptions from "./TestOptions";
import type { SuiteBlock } from "./describe";
import describe from "./describe";
import normalizeTestArgs from "./internal/normalizeTestArgs";

/**
 * Shorthand for marking a suite as TODO, same as describe([name], { todo: true
 * }[, fn]).
 *
 * @see https://nodejs.org/api/test.html#describetodoname-options-fn
 */
function describe_todo(): void;
function describe_todo(name: string): void;
function describe_todo(options: TestOptions): void;
function describe_todo(fn: SuiteBlock): void;
function describe_todo(name: string, options: TestOptions): void;
function describe_todo(name: string, fn: SuiteBlock): void;
function describe_todo(options: TestOptions, fn: SuiteBlock): void;
function describe_todo(
  name: string,
  options: TestOptions,
  fn: SuiteBlock
): void;
function describe_todo(
  nameOrOptionsOrFn?: string | TestOptions | SuiteBlock,
  optionsOrFn?: TestOptions | SuiteBlock,
  fn_?: SuiteBlock
): void {
  const { name, options, fn } = normalizeTestArgs(
    // TODO: Fix this type error
    // @ts-ignore
    nameOrOptionsOrFn,
    optionsOrFn,
    fn_
  );

  describe(name, { ...options, todo: true }, fn as SuiteBlock);
}

export default describe_todo;
