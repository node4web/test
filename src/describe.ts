import normalizeTestArgs from "./internal/normalizeTestArgs";
import type TestOptions from "./TestOptions";

type SuiteBlock = (done: (result?: any) => void) => any;

function describe(): void;
function describe(name: string): void;
function describe(options: TestOptions): void;
function describe(fn: SuiteBlock): void;
function describe(name: string, options: TestOptions): void;
function describe(name: string, fn: SuiteBlock): void;
function describe(options: TestOptions, fn: SuiteBlock): void;
function describe(name: string, options: TestOptions, fn: SuiteBlock): void;
function describe(
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
  const { concurrency, only, skip, todo, signal, timeout } = options;

  console.debug(
    "describe",
    name,
    { concurrency, only, skip, todo, signal, timeout },
    fn
  );
}

export default describe;
export type { SuiteBlock };
