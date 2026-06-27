# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
getter decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L170`](../../../../../../packages/library/src/legacy/GetterDecorators.ts#L170)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/legacy';
```

Access this function as `Getters.validateArgs()`.

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
import { Getters } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!Getters.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Getters.ICallbackFn parameters.
}
```
