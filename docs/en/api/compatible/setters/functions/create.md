# Function `create`

Create a member setter decorator callback that supports both legacy and
modern TypeScript decorator transforms.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L149`](../../../../../../packages/library/src/compatible/SetterDecorators.ts#L149)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/compatible';
```

Access this function as `Setters.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The legacy and modern implementations of the setter decorator.

## Return Value

A setter decorator callback that dispatches by runtime arguments.

## Examples

```ts
import { Setters } from '@litert/decorator/compatible';

const decorator = Setters.create({
    legacy: (ctx) => {
        void ctx;
    },
    modern: (...args) => {
        void args;
    },
});
```
