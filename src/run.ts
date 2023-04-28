import type TestStream from "./TestStream";
import createTestTree from "./createTestTree";
import createTestFileList from "./createTestFileList";
import runTestFile from "./runTestFile";

interface RunOptions {
  concurrency?: number;
  files?: string[];
  setup?: (context: TestStream) => any;
  signal?: AbortSignal;
  timeout?: number;
}

export default function run(options: RunOptions = {}): TestStream {
  if (typeof options !== "object") {
    options = {};
  }
  let { setup, concurrency, timeout, signal, files } = options;
  if (files != null) {
    if (!Array.isArray(files)) {
      throw new TypeError("options.files must be an array");
    }
  }
  files ??= [];

  const root = createTestTree({ concurrency, timeout, signal });
  Promise.all(files.map((path) => runTestFile(path, root))).then(() =>
    root.postRun()
  );
  return root.reporter;
}
