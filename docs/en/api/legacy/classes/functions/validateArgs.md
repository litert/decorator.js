# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of class
decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L167`](../../../../../../packages/library/src/legacy/ClassDecorators.ts#L167)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/legacy';
```

Access this function as `Classes.validateArgs()`.

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
import { Classes } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!Classes.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Classes.ICallbackFn parameters.
}
```
