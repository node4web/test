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

  const { setup, concurrency, timeout, signal, files } = options;
  if (files != null) {
    if (!Array.isArray(files)) {
      throw new TypeError("options.files must be an array");
    }
  }

  const root = createTestTree({ concurrency, timeout, signal });
  const testFiles = files ?? createTestFileList();

  Promise.all(testFiles.map((path) => runTestFile(path, root))).then(() =>
    root.postRun()
  );

  return root.reporter;
}
