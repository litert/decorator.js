# Function `create`

Create a class decorator callback that supports both legacy and modern
TypeScript decorator transforms.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L182`](../../../../../../packages/library/src/compatible/ClassDecorators.ts#L182)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/compatible';
```

Access this function as `Classes.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the class decorator.

## Return Value

A class decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { Classes } from '@litert/decorator/compatible';

const decorator = Classes.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
