# Function `withArgsCheck`

Wrap a static accessor decorator callback function with args check.

Source: [`packages/library/src/legacy/StaticAccessorDecorators.ts#L176`](../../../../../../packages/library/src/legacy/StaticAccessorDecorators.ts#L176)

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/legacy';
```

Access this function as `StaticAccessors.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static accessor decorator callback function to wrap.

## Return Value

A new static accessor decorator function with args check.

## Examples

```ts
import { StaticAccessors } from '@litert/decorator/legacy';

const decorator = StaticAccessors.withArgsCheck((...args) => {
    void args;
});
```
