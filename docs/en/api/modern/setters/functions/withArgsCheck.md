# Function `withArgsCheck`

Wrap a setter decorator callback function with the check of the arguments
passed to it are in the form of setter decorator or not. If the arguments
is not in the form of setter decorator, a TypeError will be thrown.

Source: [`packages/library/src/modern/SetterDecorators.ts#L115`](../../../../../../packages/library/src/modern/SetterDecorators.ts#L115)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator';
import { Setters as SettersFromModern } from '@litert/decorator/modern';
```

Access this function as `Setters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The setter decorator callback function to be wrapped.

## Return Value

A new setter decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { Setters } from '@litert/decorator';

const decorator = Setters.withArgsCheck((...args) => {
    void args;
});
```
