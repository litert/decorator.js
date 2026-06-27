# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
method decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/MethodDecorators.ts#L192`](../../../../../../packages/library/src/legacy/MethodDecorators.ts#L192)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/legacy';
```

Access this function as `Methods.validateArgs()`.

## Signature

```ts
export function validateArgs(
    args: any[],
): args is Parameters<tLoc.ICallbackFn>;
```

## Parameters

- Parameter `args`

  The arguments passed to the decorator callback.

## Return Value

See the signature for the exact return type.

## Examples

```ts
import { Methods } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!Methods.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Methods.ICallbackFn parameters.
}
```
