import { run } from "@jcbhmr/node-test";

declare global {
  interface ImportMeta {
    // @ts-ignore
    resolve: (specifier: string) => string;
  }
}

const files = Object.values(
  import.meta.glob("/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}")
).map((function_) => {
  const functionCode = "" + function_;
  const specifier = JSON.parse(functionCode.match(/import\((.*?)\)/)![1]);
  const absolute = import.meta.resolve(specifier);
  const relative = absolute.replace(location.origin, "");
  return relative;
});
const stream = run({ files });
