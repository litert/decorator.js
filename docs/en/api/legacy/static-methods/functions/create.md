# Function `create`

Create a static method decorator with the given callback function in the
unified function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticMethodDecorators.ts#L137`](../../../../../../packages/library/src/legacy/StaticMethodDecorators.ts#L137)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/legacy';
```

Access this function as `StaticMethods.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static method decorator callback function in unified style.

## Return Value

A new static method decorator function with the args check.

## Examples

```ts
import { StaticMethods } from '@litert/decorator/legacy';

const decorator = StaticMethods.create((ctx) => {
    void ctx;
});
```
