# Function `create`

Create a member accessor decorator with the given callback function in the
unified function style.

Source: [`packages/library/src/legacy/AccessorDecorators.ts#L138`](../../../../../../packages/library/src/legacy/AccessorDecorators.ts#L138)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/legacy';
```

Access this function as `Accessors.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The member accessor decorator callback in unified style.

## Return Value

A new member accessor decorator function with args check.

## Examples

```ts
import { Accessors } from '@litert/decorator/legacy';

const decorator = Accessors.create((ctx) => {
    void ctx;
});
```
