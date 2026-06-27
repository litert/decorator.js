# Author Legacy Decorators

## Required setup

- MUST import from `@litert/decorator/legacy`.
- MUST keep `experimentalDecorators: true`.
- MUST use `reflect-metadata` when the decorator stores metadata.
- MUST choose the namespace that matches the element kind, including `ConstructorParameters`, `MethodParameters`, and `StaticMethodParameters` when parameter decorators are required.

## Authoring rules

- ALWAYS use `create()` when you want the unified context object.
- ALWAYS use `withArgsCheck()` when you want raw callback arguments with validation.
- USE `validateArgs()` only when you must build manual dispatch logic.
- ALWAYS treat `ctx.constructor` as the metadata target when using `reflect-metadata`.
- NEVER use `getMetadataContainer()` in legacy decorators.

## Example

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/legacy';

function track(label: string): Methods.ICallbackFn {

    return Methods.create((ctx) => {
        Reflect.defineMetadata(label, ctx.methodName, ctx.constructor);
    });
}

class Service {

    @track('trackedMethod')
    public run(): void {}
}
```

## Read next

- Read `../library-docs/tutorials/legacy-decorators.md` for the main legacy workflow.
- Read `../library-docs/tutorials/unified-api.md` when you need the unified context fields.
- Read `../library-docs/api/legacy/README.md` for the full legacy API map.
