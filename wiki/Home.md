## Architecture

This package is heavily based on the word done by the Node.js core team in their
npm version of `node:test` which backports the `node:test` module from Node.js
v18+ to earlier versions of Node.js.

Here's the tree view of the original file structure from [nodejs/node-core-test]
as of [`414743a`] (Feb 8, 2023):

```
node-core-test/lib
├── internal
│   ├── abort_controller.js
│   ├── assert.js
│   ├── console
│   │   └── global.js
│   ├── errors.js
│   ├── main
│   │   └── test_runner.js
│   ├── options.js
│   ├── per_context
│   │   └── primordials.js
│   ├── process
│   │   └── pre_execution.js
│   ├── test_runner
│   │   ├── harness.js
│   │   ├── mock.js
│   │   ├── reporter
│   │   │   ├── dot.js
│   │   │   ├── spec.js
│   │   │   └── tap.js
│   │   ├── runner.js
│   │   ├── tap_checker.js
│   │   ├── tap_lexer.js
│   │   ├── tap_parser.js
│   │   ├── test.js
│   │   ├── tests_stream.js
│   │   ├── utils.js
│   │   └── yaml_to_js.js
│   ├── timers.js
│   ├── util
│   │   ├── colors.js
│   │   ├── inspect.js
│   │   ├── inspector.js
│   │   └── types.js
│   ├── util.js
│   └── validators.js
├── test.d.ts
├── test.js
└── timers
    └── promises.js
```

The basic program flow is that the binaries (in `node-core-test/bin`) import the
`internal/main/test_runner.js` file which is a side-effect-ful module that then
calls `run()` from `internal/test_runner/runner.js` which is the main entry
point for the test runner.

The `run()` function is a **synchronous** function that returns an in-progress
`TestStream` object that can be piped or listened to for events.

Inside the `run()` function, it delegates to `createTestTree()` which retuns the
controller for the test tree. We then pass in this controller to the
`runTestFile()` function which performs operations and tells the controller
(`root`) what to send to the `root.reporter` `TestsStream` object.

```js
const root = createTestTree();
files.map((path) => runTestFile(path, root));
return root.reporter;
```

In this @jcbhmr/node-test package, we do things largely the same! There are a
few concessions that we need to make to get the Node.js subprocess model that it
uses to run each file to work in a browser environment. Instead of subprocesses,
we use `<iframe>` windows!

The gist is that when `runTestFile()` is called, it starts a new `<iframe>` that
is a blank HTML page with a `<script>` tag that loads the test file. The test
file imports `node:test` (or at least, it _should_) which will use
`.postMessage()` and `.onmessage` to communicate with the parent window. The
parent window will then pipe the messages from the `<iframe>` to the
`TestsStream` object just like Node.js does with subprocesses.

## What's in the name

This package is named "node-test" because the "spec" that it's based on is the
Node.js core library. Specifically, the `node:test` module that is included in
Node.js v18+. Therefore, "node" for the Node.js core library and "test" for the
builtin `node:test` module.

I've scoped this package to my username because it's nowhere near popular enough
to warrant a top-level name. This way also makes it clear that this is
[@jcbhmr]'s version of the `node:test` module, not an official version like the
already existing [nodejs/node-core-test] "[test]" package.

[nodejs/node-core-test]: https://github.com/nodejs/node-core-test#readme
[`414743a`]: https://github.com/nodejs/node-core-test/tree/414743a
[@jcbhmr]: https://github.com/jcbhmr
[test]: https://www.npmjs.com/package/test
