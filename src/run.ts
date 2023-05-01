import TestsStream from "./TestsStream";

interface RunOptions {
  concurrency?: number | boolean;
  files?: string[];
  setup?: (context: TestsStream) => any;
  signal?: AbortSignal;
  timeout?: number;
}

export default function run(options: RunOptions = {}): TestsStream {
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
  const { files = [], setup, signal, timeout = Infinity } = options;

  const testStream = new TestsStream();
  setup?.(testStream);
  for (const file of files) {
    const url = "" + new URL(file, "" + location);

    const iframe = document.createElement("iframe");
    iframe.srcdoc = `<script type="module" src="${encodeURI(url)}"></script>`;
    // @ts-ignore
    iframe.style = "display: none !important;";
    document.body.append(iframe);

    iframe.contentWindow.addEventListener("message", ({ data }) => {
      console.debug("message", file, data);
    });
    iframe.contentWindow.addEventListener("error", (event) => {
      console.error("error", file, event);
    });
    iframe.contentWindow.addEventListener("unhandledrejection", (event) => {
      console.error("unhandledrejection", file, event);
    });
    iframe.contentWindow.addEventListener("close", (event) => {
      console.debug("close", file, event);
      iframe.remove();
    });
  }
}
