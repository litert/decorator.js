# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of static
getter decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L162`](../../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L162)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/legacy';
```

Access this function as `StaticGetters.validateArgs()`.

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
import { StaticGetters } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!StaticGetters.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to StaticGetters.ICallbackFn parameters.
}
```
