# `node:test` for the browser

🧪 Run `node:test` suites in the browser \
💡 Inspired by [nodejs/node-core-test]

<div align="center">

![]()

</div>

👨‍🔬 Great for browser compat with existing `node:test` tests \
🏷️ Implements `node:test` as of Node.js v20.0.0 (see below)

❓ You may be looking for [nodejs/node-core-test] instead. It's `node:test`
extracted into an npm package, but coupled very closely to Node.js and intended
for use on older Node.js versions.

## Installation

You can download this package locally using npm, Yarn, or pnpm. Just make sure
that you plan on using it **in the browser**! You can use a bundler like [Vite]
or [webpack] to bundle npm packages into a nice JavaScript bundle for use in a
`<script>` tag.

```sh
npm install @jcbhmr/node-test
```

Or, if you prefer to go buildless, you can import this module directly from an
npm CDN like [ESM>CDN] or [jsDelivr]. You'll probably also want the browser
version of `node:assert` from [browserify/commonjs-assert] or another
browser-compatible assertion package.

```js
import { ... } from "https://esm.sh/assert@2"
import { ... } from "https://esm.sh/@jcbhmr/node-test@1"
```

🛑 In Node.js, you can juse use the included `node:test` module that's built
right into Node.js! If you're using Deno or Bun, you can use their included
`node:` compatability layer to also import `node:test` and get started with no
fuss. The browser is the only really tricky part, and that's what this module is
for!

You can even use [`package.json`'s `imports` key] to declaratively switch from a
native implementation to a browser-compatible implementation:

```jsonc
// package.json
{
  "imports": {
    "#node:test": {
      "browser": "@jcbhmr/node-test",
      "default": "node:test"
    }
  }
}
```

## Usage

Tests created via the `test` module consist of a single function that is
processed in one of three ways:

1. A synchronous function that is considered failing if it throws an exception,
   and is considered passing otherwise.
2. A function that returns a `Promise` that is considered failing if the
   `Promise` rejects, and is considered passing if the `Promise` resolves.
3. A function that receives a callback function. If the callback receives any
   truthy value as its first argument, the test is considered failing. If a
   falsy value is passed as the first argument to the callback, the test is
   considered passing. If the test function receives a callback function and
   also returns a `Promise`, the test will fail.

If any tests fail, we will `reportError()`.

The following example illustrates how tests are written using the `test` module:

```js
import assert from "node:assert";
import test from "@jcbhmr/node-test";

test("synchronous passing test", (t) => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1);
});

test("failing async test", async (t) => {
  // When a function returns a promise (like an async function), we wait for it
  // to asynchronously resolve or reject.
  await new Promise((r) => setTimeout(r, 1000));
  assert.strictEqual(5, 800);
});

test("callback passing test", (t, done) => {
  // done() is the callback function. When the setTimeout() runs, it invokes
  // done() with no arguments.
  setTimeout(done, 100);
});
```

📗 Since we mirror `node:test` so closely, it's better to consult the [official
Node.js `node:test` docs]. If you find a problem or inconsistency, don't
hesitate to [open an Issue]! ❤️

### Differences from Node.js core `node:test`

1. We don't hide internal stack frames. Unless we are running in an engine where
   `Error.captureStackTrace()` is a function, in which case we do hide our own
   stack frames.
2. We don't integrate with the `node --test` CLI flags. Instead, we use TBD.

## Development

This package is written in TypeScript and uses [Vite] to create a JavaScript
bundle for publication to [npmjs.com]. We use [Vitest] for testing in a headless
Chrome browser. You can start up the test watcher by running `npm start`.

<!-- prettier-ignore-start -->
[`package.json`'s `imports` key]: https://nodejs.org/api/packages.html#imports
[official Node.js `node:test` docs]: https://nodejs.org/api/test.html#test-runner
<!-- prettier-ignore-end -->
