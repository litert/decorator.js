# Function `create`

Create a static accessor decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L152`](../../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L152)

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/compatible';
```

Access this function as `StaticAccessors.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the static accessor decorator.

## Return Value

A static accessor decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { StaticAccessors } from '@litert/decorator/compatible';

const decorator = StaticAccessors.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
