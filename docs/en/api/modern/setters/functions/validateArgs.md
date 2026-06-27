# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
setter decorator or not.

> **Use in the decorator callback functions only.**

Source: [`packages/library/src/modern/SetterDecorators.ts#L87`](../../../../../../packages/library/src/modern/SetterDecorators.ts#L87)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator';
import { Setters as SettersFromModern } from '@litert/decorator/modern';
```

Access this function as `Setters.validateArgs()`.

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
import { Setters } from '@litert/decorator';

function decorator(...args: any[]): void {
    if (!Setters.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Setters.ICallbackFn parameters.
}
```
