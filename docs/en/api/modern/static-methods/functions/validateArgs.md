# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of static
method decorator or not.

> **Use in the decorator callback functions only.**

Source: [`packages/library/src/modern/StaticMethodDecorators.ts#L87`](../../../../../../packages/library/src/modern/StaticMethodDecorators.ts#L87)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator';
import { StaticMethods as StaticMethodsFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticMethods.validateArgs()`.

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
import { StaticMethods } from '@litert/decorator';

function decorator(...args: any[]): void {
    if (!StaticMethods.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to StaticMethods.ICallbackFn parameters.
}
```
