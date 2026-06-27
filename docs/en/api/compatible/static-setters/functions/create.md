# Function `create`

Create a static setter decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L152`](../../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L152)

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/compatible';
```

Access this function as `StaticSetters.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the static setter decorator.

## Return Value

A static setter decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { StaticSetters } from '@litert/decorator/compatible';

const decorator = StaticSetters.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
