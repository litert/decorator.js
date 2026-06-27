# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
accessor decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/AccessorDecorators.ts#L166`](../../../../../../packages/library/src/legacy/AccessorDecorators.ts#L166)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/legacy';
```

Access this function as `Accessors.validateArgs()`.

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
import { Accessors } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!Accessors.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Accessors.ICallbackFn parameters.
}
```
