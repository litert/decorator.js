# Function `withArgsCheck`

Wrap an accessor decorator callback function with the check of the arguments
passed to it are in the form of accessor decorator or not. If the arguments
is not in the form of accessor decorator, a TypeError will be thrown.

Source: [`packages/library/src/modern/AccessorDecorators.ts#L118`](../../../../../../packages/library/src/modern/AccessorDecorators.ts#L118)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator';
import { Accessors as AccessorsFromModern } from '@litert/decorator/modern';
```

Access this function as `Accessors.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The accessor decorator callback function to be wrapped.

## Return Value

A new accessor decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { Accessors } from '@litert/decorator';

const decorator = Accessors.withArgsCheck((...args) => {
    void args;
});
```
