# Metadata And Composition

## Modern metadata rules

1. MUST define a private metadata key, usually a `Symbol`.
2. MUST create a helper that returns the structured object stored in `ctx.metadata`.
3. MUST let each decorator write only its local part of that object.
4. MUST read the completed configuration with `getMetadataContainer(YourClass)` after the class definition.
5. NEVER design modern member decorators around direct constructor discovery.

## Legacy metadata rules

1. MUST import `reflect-metadata` before using metadata APIs.
2. MUST store metadata against `ctx.constructor`.
3. NEVER use `getMetadataContainer()` for legacy metadata.

## Composition rules

- ALWAYS treat `compose()` as left-to-right execution.
- ALWAYS compose only decorators of the same kind.
- NEVER pass an empty array or non-function entries to `compose()`.
- ALWAYS remember that the last non-`undefined` replacement wins for class, method, getter, setter, and accessor chains.
- ALWAYS remember that property and parameter decorators do not produce replacement values.

## General decorator rules

- USE `GeneralDecorators.create()` when one decorator must support multiple element kinds.
- ALWAYS register `onGetter` and `onSetter` explicitly when standalone getters or setters must be supported.
- ALWAYS register `onAccessor` separately for paired accessors.
- NEVER expect parameter decorator support in modern or compatible general decorators.

## Example patterns

### Modern shared metadata

```ts
import {
    Classes,
    Methods,
    getMetadataContainer,
} from '@litert/decorator';

const CONTROLLER_CONFIG = Symbol('controller.config');

function useControllerConfig(metadata: Record<PropertyKey, unknown>) {

    return (metadata[CONTROLLER_CONFIG] ??= { routes: [] }) as {
        prefix?: string;
        routes: Array<{ methodName: string | symbol; path: string; static: boolean; }>;
    };
}

function Controller(prefix: string): Classes.ICallbackFn {

    return Classes.withArgsCheck((_class, ctx) => {
        useControllerConfig(ctx.metadata!).prefix = prefix;
    });
}

function Get(path: string): Methods.ICallbackFn {

    return Methods.withArgsCheck((_method, ctx) => {
        useControllerConfig(ctx.metadata!).routes.push({
            methodName: ctx.name,
            path,
            static: ctx.static,
        });
    });
}

const metadata = getMetadataContainer(class Demo {});
void metadata;
```

### Composition

```ts
import { Methods } from '@litert/decorator';

const logA: Methods.ICallbackFn = (_method, ctx) => {
    console.log('A:', String(ctx.name));
};

const logB: Methods.ICallbackFn = (_method, ctx) => {
    console.log('B:', String(ctx.name));
};

const combined = Methods.compose([logA, logB]);
```

## Read next

- Read `../library-docs/tutorials/metadata.md` for the full metadata pattern.
- Read `../library-docs/tutorials/composition.md` for replacement-chaining details.
- Read `../library-docs/tutorials/general-decorators.md` for multi-kind dispatch.
