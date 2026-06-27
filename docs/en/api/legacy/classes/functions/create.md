# Function `create`

Create a class decorator with the given callback function in the unified
function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L129`](../../../../../../packages/library/src/legacy/ClassDecorators.ts#L129)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/legacy';
```

Access this function as `Classes.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The class decorator callback function in unified style.

## Return Value

A new class decorator function with the args check.

## Examples

```ts
import { Classes } from '@litert/decorator/legacy';

const decorator = Classes.create((ctx) => {
    void ctx;
});
```
