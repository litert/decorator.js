# Function `withArgsCheck`

Wrap a static getter decorator callback function with args check.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L179`](../../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L179)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/legacy';
```

Access this function as `StaticGetters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static getter decorator callback function to wrap.

## Return Value

A new static getter decorator function with args check.

## Examples

```ts
import { StaticGetters } from '@litert/decorator/legacy';

const decorator = StaticGetters.withArgsCheck((...args) => {
    void args;
});
```
