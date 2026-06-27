# Function `create`

Create a static setter decorator with the given callback function in the
unified function style.

Source: [`packages/library/src/legacy/StaticSetterDecorators.ts#L134`](../../../../../../packages/library/src/legacy/StaticSetterDecorators.ts#L134)

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/legacy';
```

Access this function as `StaticSetters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static setter decorator callback in unified style.

## Return Value

A new static setter decorator function with args check.

## Examples

```ts
import { StaticSetters } from '@litert/decorator/legacy';

const decorator = StaticSetters.create((ctx) => {
    void ctx;
});
```
