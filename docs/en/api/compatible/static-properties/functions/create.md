# Function `create`

Create a static property decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L152`](../../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L152)

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/compatible';
```

Access this function as `StaticProperties.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the static property decorator.

## Return Value

A static property decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { StaticProperties } from '@litert/decorator/compatible';

const decorator = StaticProperties.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
