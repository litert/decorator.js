# Function `create`

Create a member method decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L138`](../../../../../../packages/library/src/compatible/MethodDecorators.ts#L138)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/compatible';
```

Access this function as `Methods.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the method decorator.

## Return Value

A method decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { Methods } from '@litert/decorator/compatible';

const decorator = Methods.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
