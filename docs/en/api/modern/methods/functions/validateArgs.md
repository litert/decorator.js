# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
method decorator or not.

> **Use in the decorator callback functions only.**

Source: [`packages/library/src/modern/MethodDecorators.ts#L87`](../../../../../../packages/library/src/modern/MethodDecorators.ts#L87)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator';
import { Methods as MethodsFromModern } from '@litert/decorator/modern';
```

Access this function as `Methods.validateArgs()`.

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
import { Methods } from '@litert/decorator';

function decorator(...args: any[]): void {
    if (!Methods.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Methods.ICallbackFn parameters.
}
```
