# Function `withArgsCheck`

Wrap a member setter decorator callback function with args check.

Source: [`packages/library/src/legacy/SetterDecorators.ts#L187`](../../../../../../packages/library/src/legacy/SetterDecorators.ts#L187)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/legacy';
```

Access this function as `Setters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The member setter decorator callback function to wrap.

## Return Value

A new member setter decorator function with args check.

## Examples

```ts
import { Setters } from '@litert/decorator/legacy';

const decorator = Setters.withArgsCheck((...args) => {
    void args;
});
```
