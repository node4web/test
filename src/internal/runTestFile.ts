import { pEvent } from "p-event";
import FileTest from "./FileTest";

export default async function runTestFile(path: string, root: any) {
  const subtest = root.createSubtest(FileTest, path, async (t) => {
    const worker = new Worker(path, { type: "module" });
    t.signal.addEventListener("abort", () => {
      worker.terminate();
    });

    let error: Error | null | undefined;
    worker.addEventListener("error", (event) => {
      error = event.error;
    });

    const stdioEvent = await pEvent(
      worker,
      "message",
      ({ data }) => data?.type === "nodetest:stdio"
    );
    const { stdout, stderr } = stdioEvent.data;

    const exitEvent = await pEvent(
      worker,
      "message",
      ({ data }) => data?.type === "nodetest:exit"
    );
    const { exitCode } = exitEvent.data;

    if (exitCode) {
      if (!error) {
        error = new DOMException("test failed", "TestFailureError");
      }
      throw error;
    }
  });
  return subtest.start();
}
