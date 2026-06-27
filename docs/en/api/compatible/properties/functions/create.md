# Function `create`

Create a member property decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L152`](../../../../../../packages/library/src/compatible/PropertyDecorators.ts#L152)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/compatible';
```

Access this function as `Properties.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the property decorator.

## Return Value

A property decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { Properties } from '@litert/decorator/compatible';

const decorator = Properties.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
