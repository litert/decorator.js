# Function `withArgsCheck`

Wrap a member getter decorator callback function with args check.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L187`](../../../../../../packages/library/src/legacy/GetterDecorators.ts#L187)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/legacy';
```

Access this function as `Getters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The member getter decorator callback function to wrap.

## Return Value

A new member getter decorator function with args check.

## Examples

```ts
import { Getters } from '@litert/decorator/legacy';

const decorator = Getters.withArgsCheck((...args) => {
    void args;
});
```
