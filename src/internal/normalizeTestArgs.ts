import type TestOptions from "../TestOptions";

interface NormalizedTestOptions {
  only: boolean;
  skip: boolean | string;
  todo: boolean | string;
  signal?: AbortSignal;
  timeout: number;
  concurrency: number;
}

type NormalizedTestArgs = {
  name: string;
  options: NormalizedTestOptions;
  fn: Function;
};

function normalizeTestArgs(): NormalizedTestArgs;
function normalizeTestArgs(name: string): NormalizedTestArgs;
function normalizeTestArgs(options: TestOptions): NormalizedTestArgs;
function normalizeTestArgs(fn: Function): NormalizedTestArgs;
function normalizeTestArgs(
  name: string,
  options: TestOptions
): NormalizedTestArgs;
function normalizeTestArgs(name: string, fn: Function): NormalizedTestArgs;
function normalizeTestArgs(
  options: TestOptions,
  fn: Function
): NormalizedTestArgs;
function normalizeTestArgs(
  name: string,
  options: TestOptions,
  fn: Function
): NormalizedTestArgs;
function normalizeTestArgs(
  nameOrOptionsOrFn?: string | TestOptions | Function,
  optionsOrFn?: TestOptions | Function,
  fn?: Function
): NormalizedTestArgs {
  let name: string;
  let options: TestOptions;
  // function f(): Promise<void>;
  if (arguments.length === 0) {
    name = "<anonymous>";
    options = {};
    fn = () => {};
  }
  // function f(name: string): Promise<void>;
  // function f(options: TestOptions): Promise<void>;
  // function f(fn: Function): Promise<void>;
  else if (arguments.length === 1) {
    // function f(name: string): Promise<void>;
    if (typeof nameOrOptionsOrFn === "string") {
      name = nameOrOptionsOrFn;
      options = {};
      fn = () => {};
    }
    // function f(options: TestOptions): Promise<void>;
    else if (nameOrOptionsOrFn && typeof nameOrOptionsOrFn === "object") {
      name = "<anonymous>";
      options = nameOrOptionsOrFn;
      fn = () => {};
    }
    // function f(fn: Function): Promise<void>;
    else if (typeof nameOrOptionsOrFn === "function") {
      name = nameOrOptionsOrFn.name || "<anonymous>";
      options = {};
      fn = nameOrOptionsOrFn;
    } else {
      throw new TypeError();
    }
  }
  // function f(name: string, options: TestOptions): Promise<void>;
  // function f(name: string, fn: Function): Promise<void>;
  // function f(options: TestOptions, fn: Function): Promise<void>;
  else if (arguments.length === 2) {
    // function f(name: string, options: TestOptions): Promise<void>;
    if (
      typeof nameOrOptionsOrFn === "string" &&
      optionsOrFn &&
      typeof optionsOrFn === "object"
    ) {
      name = nameOrOptionsOrFn;
      options = optionsOrFn;
      fn = () => {};
    }
    // function f(name: string, fn: Function): Promise<void>;
    else if (
      typeof nameOrOptionsOrFn === "string" &&
      typeof optionsOrFn === "function"
    ) {
      name = nameOrOptionsOrFn;
      options = {};
      fn = optionsOrFn;
    }
    // function f(options: TestOptions, fn: Function): Promise<void>;
    else if (
      nameOrOptionsOrFn &&
      typeof nameOrOptionsOrFn === "object" &&
      typeof optionsOrFn === "function"
    ) {
      name = optionsOrFn.name || "<anonymous>";
      options = nameOrOptionsOrFn;
      fn = optionsOrFn;
    } else {
      throw new TypeError();
    }
  }
  // function f(
  //   name: string,
  //   options: TestOptions,
  //   fn: Function
  // ): Promise<void>;
  else {
    if (
      typeof nameOrOptionsOrFn === "string" &&
      optionsOrFn &&
      typeof optionsOrFn === "object" &&
      typeof fn === "function"
    ) {
      name = nameOrOptionsOrFn;
      options = optionsOrFn;
      fn = fn;
    } else {
      throw new TypeError();
    }
  }
  const {
    only = false,
    skip = false,
    todo = false,
    signal,
    timeout = Infinity,
  } = options;
  let concurrency: number;
  const { concurrency: concurrencyOption = false } = options;
  if (typeof concurrencyOption === "number") {
    concurrency = concurrencyOption;
  } else if (concurrencyOption === true) {
    concurrency = navigator.hardwareConcurrency || 1;
  } else if (concurrencyOption === false) {
    concurrency = 1;
  } else {
    throw new TypeError();
  }

  return {
    name,
    options: {
      only,
      skip,
      todo,
      signal,
      timeout,
      concurrency,
    },
    fn,
  };
}

export default normalizeTestArgs;
export type { NormalizedTestArgs, NormalizedTestOptions };
