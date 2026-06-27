# Function `withArgsCheck`

Wrap a method decorator callback function with the check of the arguments
passed to it are in the form of method decorator or not. If the arguments
is not in the form of method decorator, a TypeError will be thrown.

Source: [`packages/library/src/modern/MethodDecorators.ts#L115`](../../../../../../packages/library/src/modern/MethodDecorators.ts#L115)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator';
import { Methods as MethodsFromModern } from '@litert/decorator/modern';
```

Access this function as `Methods.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The method decorator callback function to be wrapped.

## Return Value

A new method decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { Methods } from '@litert/decorator';

const decorator = Methods.withArgsCheck((...args) => {
    void args;
});
```
