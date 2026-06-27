# Function `create`

Create a compatible general decorator callback.

For accessor-like decorators, the generated decorator dispatches with this
applying priority: accessor > getter == setter. The same priority rule
applies to static accessor, static getter, and static setter decorators.

Source: [`packages/library/src/compatible/GeneralDecorators.ts#L376`](../../../../../../packages/library/src/compatible/GeneralDecorators.ts#L376)

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';
```

Access this function as `GeneralDecorators.create()`.

## Signature

```ts
export function create(opts: tLoc.ICreateOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The supported decorator cases and their compatible implementations.

## Return Value

A decorator callback that dispatches by runtime decorator arguments.

## Examples

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';

const decorator = GeneralDecorators.create({
    onMethod: {
        legacy: (ctx) => {
            void ctx;
        },
        modern: (method, ctx) => {
            void method;
            void ctx;
        },
    },
});
```
