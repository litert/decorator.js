# Function `create`

Create a member getter decorator with the given callback function in the
unified function style.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L142`](../../../../../../packages/library/src/legacy/GetterDecorators.ts#L142)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/legacy';
```

Access this function as `Getters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The member getter decorator callback in unified style.

## Return Value

A new member getter decorator function with args check.

## Examples

```ts
import { Getters } from '@litert/decorator/legacy';

const decorator = Getters.create((ctx) => {
    void ctx;
});
```
