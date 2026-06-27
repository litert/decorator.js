# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
accessor decorator or not.

> **Use in the decorator callback functions only.**

Source: [`packages/library/src/modern/AccessorDecorators.ts#L87`](../../../../../../packages/library/src/modern/AccessorDecorators.ts#L87)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator';
import { Accessors as AccessorsFromModern } from '@litert/decorator/modern';
```

Access this function as `Accessors.validateArgs()`.

## Signature

```ts
export function validateArgs(
    args: any[],
): args is Parameters<tLib.ICallbackFn>;
```

## Parameters

- Parameter `args`

  The arguments passed to the decorator callback.

## Return Value

See the signature for the exact return type.

## Examples

```ts
import { Accessors } from '@litert/decorator';

function decorator(...args: any[]): void {
    if (!Accessors.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Accessors.ICallbackFn parameters.
}
```
