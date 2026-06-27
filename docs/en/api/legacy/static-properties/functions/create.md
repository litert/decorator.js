# Function `create`

Create a static property decorator with the given callback function in the
unified function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L124`](../../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L124)

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/legacy';
```

Access this function as `StaticProperties.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static property decorator callback function in unified style.

## Return Value

A new static property decorator function with the args check.

## Examples

```ts
import { StaticProperties } from '@litert/decorator/legacy';

const decorator = StaticProperties.create((ctx) => {
    void ctx;
});
```
