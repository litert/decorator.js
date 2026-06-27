# Function `create`

Create a member getter decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L146`](../../../../../../packages/library/src/compatible/GetterDecorators.ts#L146)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/compatible';
```

Access this function as `Getters.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the getter decorator.

## Return Value

A getter decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { Getters } from '@litert/decorator/compatible';

const decorator = Getters.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
