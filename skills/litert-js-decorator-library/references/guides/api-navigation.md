# API Navigation

## Start pages

| Need | Open |
| --- | --- |
| Package overview | `../library-docs/README.md` |
| First-use setup | `../library-docs/quick-start.md` |
| Mode questions | `../library-docs/faq.md` |
| Tutorial index | `../library-docs/tutorials/README.md` |
| Full API index | `../library-docs/api/README.md` |

## Mode roots

| Mode | Open |
| --- | --- |
| Modern | `../library-docs/api/modern/README.md` |
| Legacy | `../library-docs/api/legacy/README.md` |
| Compatible | `../library-docs/api/compatible/README.md` |

## Common lookups

| Need | Open |
| --- | --- |
| Modern metadata container | `../library-docs/api/modern/functions/getMetadataContainer.md` |
| Modern class/member/static namespaces | `../library-docs/api/modern/<kind>/README.md` |
| Legacy class/member/static namespaces | `../library-docs/api/legacy/<kind>/README.md` |
| Compatible class/member/static namespaces | `../library-docs/api/compatible/<kind>/README.md` |
| `compose()` details | `../library-docs/tutorials/composition.md` or the matching `functions/compose.md` file |
| Legacy `create()` unified context | `../library-docs/tutorials/unified-api.md` or the matching `functions/create.md` file |
| `GeneralDecorators` behavior | `../library-docs/tutorials/general-decorators.md` |

## Kind paths

| Kind | Modern path fragment | Legacy path fragment | Compatible path fragment |
| --- | --- | --- | --- |
| Class | `classes/` | `classes/` | `classes/` |
| Method | `methods/` | `methods/` | `methods/` |
| Property | `properties/` | `properties/` | `properties/` |
| Accessor | `accessors/` | `accessors/` | `accessors/` |
| Getter | `getters/` | `getters/` | `getters/` |
| Setter | `setters/` | `setters/` | `setters/` |
| Static method | `static-methods/` | `static-methods/` | `static-methods/` |
| Static property | `static-properties/` | `static-properties/` | `static-properties/` |
| Static accessor | `static-accessors/` | `static-accessors/` | `static-accessors/` |
| Static getter | `static-getters/` | `static-getters/` | `static-getters/` |
| Static setter | `static-setters/` | `static-setters/` | `static-setters/` |
| Method parameter | _not supported_ | `method-parameters/` | _not supported_ |
| Static method parameter | _not supported_ | `static-method-parameters/` | _not supported_ |
| Constructor parameter | _not supported_ | `constructor-parameters/` | _not supported_ |

## Exact-file rule

1. Open the mode root first.
2. Open the kind `README.md` next.
3. Open `functions/*.md` or `Typings.md` only for the exact API the task needs.
