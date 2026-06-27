# Function `withArgsCheck`

Wrap a static method decorator callback function with the check of the
arguments passed to it are in the form of static method decorator or not.
If the arguments is not in the form of static method decorator, a TypeError
will be thrown.

Source: [`packages/library/src/modern/StaticMethodDecorators.ts#L116`](../../../../../../packages/library/src/modern/StaticMethodDecorators.ts#L116)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator';
import { StaticMethods as StaticMethodsFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticMethods.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static method decorator callback function to be wrapped.

## Return Value

A new static method decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { StaticMethods } from '@litert/decorator';

const decorator = StaticMethods.withArgsCheck((...args) => {
    void args;
});
```
