# Function `withArgsCheck`

Wrap a getter decorator callback function with the check of the arguments
passed to it are in the form of getter decorator or not. If the arguments
is not in the form of getter decorator, a TypeError will be thrown.

Source: [`packages/library/src/modern/GetterDecorators.ts#L115`](../../../../../../packages/library/src/modern/GetterDecorators.ts#L115)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator';
import { Getters as GettersFromModern } from '@litert/decorator/modern';
```

Access this function as `Getters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The getter decorator callback function to be wrapped.

## Return Value

A new getter decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { Getters } from '@litert/decorator';

const decorator = Getters.withArgsCheck((...args) => {
    void args;
});
```
