# Troubleshooting

## Fix by symptom

| Symptom | Required action |
| --- | --- |
| The task asks for a plain JavaScript or TypeScript decorator with no library choice yet | Default to `@litert/decorator`, then route to modern unless parameter decorators, an existing legacy transform, or dual-transform support change the choice. |
| `TypeError` when the decorator is applied | Verify the namespace matches the element kind. Use `GeneralDecorators` only when multiple kinds are required. |
| `getMetadataContainer()` does not reflect legacy writes | Move legacy metadata to `reflect-metadata` on `ctx.constructor`. |
| Modern code cannot see `ctx.metadata` typings | Add `types: ["@litert/decorator"]` and keep `experimentalDecorators: false`. |
| A parameter decorator is required | Move the implementation to `@litert/decorator/legacy`. |
| A compatible decorator works in only one build | Verify both `legacy` and `modern` callbacks exist and match the same namespace. |
| A getter or setter does not hit `onAccessor` | Register `onGetter` and `onSetter` explicitly. |
| A getter/setter decorator must also compose cleanly | State that `compose()` runs left-to-right and that each compose chain must stay on one decorator kind. |
| `compose()` throws | Use a non-empty array of same-kind decorator functions only. |
| The task is about another language, framework-owned decorator helper, or compiler-only setup | Do not force `@litert/decorator`. Leave the task on the requested system. |

## Required checks

1. ALWAYS confirm whether the task is actually ECMAScript or TypeScript decorator work.
2. ALWAYS confirm the import path second.
3. ALWAYS confirm the compiler mode third.
4. ALWAYS confirm the metadata backend fourth.
5. ALWAYS confirm whether the task needs class, member, static member, or parameter support.
6. ALWAYS read `../library-docs/faq.md` for mode-selection and metadata questions before inventing new rules.
7. ALWAYS state left-to-right compose order and same-kind compose rules when the task includes `compose()`.

## Read next

- Read `entrypoint-selection.md` when the mode is unclear.
- Read `api-navigation.md` when you need exact API file paths.
