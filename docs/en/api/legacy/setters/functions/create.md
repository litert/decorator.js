# Function `create`

Create a member setter decorator with the given callback function in the
unified function style.

Source: [`packages/library/src/legacy/SetterDecorators.ts#L142`](../../../../../../packages/library/src/legacy/SetterDecorators.ts#L142)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/legacy';
```

Access this function as `Setters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The member setter decorator callback in unified style.

## Return Value

A new member setter decorator function with args check.

## Examples

```ts
import { Setters } from '@litert/decorator/legacy';

const decorator = Setters.create((ctx) => {
    void ctx;
});
```
