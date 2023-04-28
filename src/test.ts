export default function test(name: string, body: () => Promise<any> | any) {
  console.log("node-test", "test", name, body);
}
