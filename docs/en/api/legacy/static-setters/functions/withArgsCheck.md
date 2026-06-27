# Function `withArgsCheck`

Wrap a static setter decorator callback function with args check.

Source: [`packages/library/src/legacy/StaticSetterDecorators.ts#L179`](../../../../../../packages/library/src/legacy/StaticSetterDecorators.ts#L179)

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/legacy';
```

Access this function as `StaticSetters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static setter decorator callback function to wrap.

## Return Value

A new static setter decorator function with args check.

## Examples

```ts
import { StaticSetters } from '@litert/decorator/legacy';

const decorator = StaticSetters.withArgsCheck((...args) => {
    void args;
});
```
