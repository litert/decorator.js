# Function `create`

Create a static method decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L138`](../../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L138)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/compatible';
```

Access this function as `StaticMethods.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the static method decorator.

## Return Value

A static method decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { StaticMethods } from '@litert/decorator/compatible';

const decorator = StaticMethods.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
