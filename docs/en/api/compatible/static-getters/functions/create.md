# Function `create`

Create a static getter decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L149`](../../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L149)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/compatible';
```

Access this function as `StaticGetters.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the static getter decorator.

## Return Value

A static getter decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { StaticGetters } from '@litert/decorator/compatible';

const decorator = StaticGetters.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
