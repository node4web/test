This repo is a user-land port
of [`node:test`](https://nodejs.org/api/test.html) commits are chrry-picked from
node core, using this procedure:

```
git fetch https://github.com/nodejs/node.git main
git cherry-pick -x FETCH_HEAD # instead of FETCH_HEAD, set the commit SHA you want to backport
# ... resolve conflicts ...
# ... replace the URL in the files with the new git SHA ...
# ...
# Run the linter and the tests:
npm run test:lint:fix && npm run test:unit
# ... fix the failing tests, add the missing primordials, etc.
# ...
# Re-run the tests before committing:
npm run test:lint:fix && npm run test:unit
# Stage the files:
git add .
# Commit (using -S so the commit show with the "Verified" on GitHub):
git commit -S # (amend the commit title so it respects Conventional commit)

```

you might need to add a GPG-key to your account to run `commit -S`,
see <https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key>

A few things to have in mind:

- `primordials` is not available on user-land modules, replace it
  with `require('#internal/per_context/primordials')`.
- It's likely you'll need to add primordials
  in `lib/internal/per_context/primordials.js`.
- User-land modules should not depend on `internal/` modules. Instead,
  replace `internal/` with `#internal/`, and ensure the linked module is
  compatible.
- Tests should not be altered, unless there's a good reason for it. When a test
  doesn't pass, it usually means there's a bug in the library code (so it should
  be fixed in `lib/`), or there's a difference between our test env and the
  Node.js one (in which case, the fix should probably happen in `test/common/`).
