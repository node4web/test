import {
  setTest,
  setTestOnly,
  setTestNamePattern,
  setTestReporter,
  setTestReporterDestination,
} from "../src/index";

const testModules = import.meta.glob(
  "/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
);

const menu = document.createElement("menu");
document.body.append(menu);
for (const [name, importTestModule] of Object.entries(testModules)) {
  const li = document.createElement("li");
  menu.append(li);
  const button = document.createElement("button");
  li.append(button);
  button.innerText = name;
  button.addEventListener("click", async () => {
    setTest(true);
    await importTestModule();
  });
}
