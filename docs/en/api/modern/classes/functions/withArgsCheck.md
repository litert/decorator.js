# Function `withArgsCheck`

Wrap a class decorator callback function with the check of the arguments
passed to it are in the form of class decorator or not. If the arguments
is not in the form of class decorator, a TypeError will be thrown.

Source: [`packages/library/src/modern/ClassDecorators.ts#L106`](../../../../../../packages/library/src/modern/ClassDecorators.ts#L106)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator';
import { Classes as ClassesFromModern } from '@litert/decorator/modern';
```

Access this function as `Classes.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The class decorator callback function to be wrapped.

## Return Value

A new class decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { Classes } from '@litert/decorator';

const decorator = Classes.withArgsCheck((...args) => {
    void args;
});
```
