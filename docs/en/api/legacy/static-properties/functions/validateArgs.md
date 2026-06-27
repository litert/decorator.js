# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of static
property decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L163`](../../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L163)

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/legacy';
```

Access this function as `StaticProperties.validateArgs()`.

## Signature

```ts
export function validateArgs(
    args: unknown[],
): args is Parameters<tLoc.ICallbackFn>;
```

## Parameters

- Parameter `args`

  The arguments passed to the decorator callback.

## Return Value

See the signature for the exact return type.

## Examples

```ts
import { StaticProperties } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!StaticProperties.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to StaticProperties.ICallbackFn parameters.
}
```
