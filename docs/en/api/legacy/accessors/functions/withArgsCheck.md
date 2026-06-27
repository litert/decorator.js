# Function `withArgsCheck`

Wrap a member accessor decorator callback function with args check.

Source: [`packages/library/src/legacy/AccessorDecorators.ts#L184`](../../../../../../packages/library/src/legacy/AccessorDecorators.ts#L184)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/legacy';
```

Access this function as `Accessors.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The member accessor decorator callback function to wrap.

## Return Value

A new member accessor decorator function with args check.

## Examples

```ts
import { Accessors } from '@litert/decorator/legacy';

const decorator = Accessors.withArgsCheck((...args) => {
    void args;
});
```
