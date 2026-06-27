# Function `create`

Create a property decorator with the given callback function in the unified
function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/PropertyDecorators.ts#L131`](../../../../../../packages/library/src/legacy/PropertyDecorators.ts#L131)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/legacy';
```

Access this function as `Properties.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The property decorator callback function in unified style.

## Return Value

A new property decorator function with the args check.

## Examples

```ts
import { Properties } from '@litert/decorator/legacy';

const decorator = Properties.create((ctx) => {
    void ctx;
});
```
