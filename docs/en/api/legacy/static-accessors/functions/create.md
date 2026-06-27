# Function `create`

Create a static accessor decorator with the given callback function in the
unified function style.

Source: [`packages/library/src/legacy/StaticAccessorDecorators.ts#L130`](../../../../../../packages/library/src/legacy/StaticAccessorDecorators.ts#L130)

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/legacy';
```

Access this function as `StaticAccessors.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static accessor decorator callback in unified style.

## Return Value

A new static accessor decorator function with args check.

## Examples

```ts
import { StaticAccessors } from '@litert/decorator/legacy';

const decorator = StaticAccessors.create((ctx) => {
    void ctx;
});
```
