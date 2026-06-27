# Function `create`

Create a static getter decorator with the given callback function in the
unified function style.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L134`](../../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L134)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/legacy';
```

Access this function as `StaticGetters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static getter decorator callback in unified style.

## Return Value

A new static getter decorator function with args check.

## Examples

```ts
import { StaticGetters } from '@litert/decorator/legacy';

const decorator = StaticGetters.create((ctx) => {
    void ctx;
});
```
