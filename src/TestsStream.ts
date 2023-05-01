import { Readable } from "node:stream";

export default class TestsStream extends Readable {
  #buffer = [];
  #canPush = true;
  constructor() {
    super({ objectMode: true });
  }

  _read() {
    this.#canPush = true;

    while (this.#buffer.length > 0) {
      const obj = this.#buffer.shift();

      if (!this.#tryPush(obj)) {
        return;
      }
    }
  }

  fail(nesting, file, testNumber, name, details, directive) {
    const data = {
      name,
      nesting,
      file,
      testNumber,
      details,
      ...directive,
    };
    Object.setPrototypeOf(data, null);
    this.#emit("test:fail", data);
  }

  ok(nesting, file, testNumber, name, details, directive) {
    const data = {
      name,
      nesting,
      file,
      testNumber,
      details,
      ...directive,
    };
    Object.setPrototypeOf(data, null);
    this.#emit("test:pass", data);
  }

  plan(nesting, file, count) {
    const data = { nesting, file, count };
    Object.setPrototypeOf(data, null);
    this.#emit("test:plan", data);
  }

  getSkip(reason = true) {
    const o = { skip: reason };
    Object.setPrototypeOf(o, null);
    return o;
  }

  getTodo(reason = true) {
    const o = { todo: reason };
    Object.setPrototypeOf(o, null);
    return o;
  }

  start(nesting, file, name) {
    const data = { nesting, file, name };
    Object.setPrototypeOf(data, null);
    this.#emit("test:start", data);
  }

  diagnostic(nesting, file, message) {
    const data = { nesting, file, message };
    Object.setPrototypeOf(data, null);
    this.#emit("test:diagnostic", data);
  }

  #emit(type, data) {
    this.emit(type, data);
    this.#tryPush({ type, data });
  }

  #tryPush(message) {
    if (this.#canPush) {
      this.#canPush = this.push(message);
    } else {
      this.#buffer.push(message);
    }

    return this.#canPush;
  }
}
