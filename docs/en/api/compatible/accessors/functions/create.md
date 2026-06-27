# Function `create`

Create a member accessor decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/AccessorDecorators.ts#L152`](../../../../../../packages/library/src/compatible/AccessorDecorators.ts#L152)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/compatible';
```

Access this function as `Accessors.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the accessor decorator.

## Return Value

An accessor decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { Accessors } from '@litert/decorator/compatible';

const decorator = Accessors.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
