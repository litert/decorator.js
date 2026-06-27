# Author Modern Decorators

## Required setup

- MUST import from `@litert/decorator` or `@litert/decorator/modern`.
- MUST keep `experimentalDecorators: false`.
- MUST include `types: ["@litert/decorator"]` in `compilerOptions`.
- MUST choose the namespace that matches the element kind: `Classes`, `Methods`, `Properties`, `Accessors`, `Getters`, `Setters`, `StaticMethods`, `StaticProperties`, `StaticAccessors`, `StaticGetters`, `StaticSetters`, or `GeneralDecorators`.

## Authoring rules

- ALWAYS use `withArgsCheck()` for checked raw-callback decorators.
- ALWAYS use `compose()` for ordered decorator chains.
- USE `validateArgs()` only when you must build manual dispatch logic.
- ALWAYS write shared class configuration through `ctx.metadata`.
- ALWAYS read completed metadata through `getMetadataContainer(YourClass)` after the class definition.
- NEVER design modern member decorators around direct constructor or prototype access.

## Example

```ts
import {
    Methods,
    getMetadataContainer,
} from '@litert/decorator';

function route(path: string): Methods.ICallbackFn {

    return Methods.withArgsCheck((_method, ctx) => {
        ctx.metadata!['route:' + String(ctx.name)] = path;
    });
}

class Controller {

    @route('/users')
    public listUsers(): void {}
}

const metadata = getMetadataContainer(Controller);
console.log(metadata.get('route:listUsers'));
```

## Read next

- Read `metadata-and-composition.md` for metadata design, `compose`, and `GeneralDecorators`.
- Read `../library-docs/tutorials/modern-decorators.md` for the main workflow.
- Read `../library-docs/api/modern/README.md` for the full modern API map.
