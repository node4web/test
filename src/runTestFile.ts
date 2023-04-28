export default async function runTestFile(path: string, root: any) {
  const absolutePath = "" + new URL(path, "" + location);
  console.log("node-test", "runTestFile", path, root);
}
