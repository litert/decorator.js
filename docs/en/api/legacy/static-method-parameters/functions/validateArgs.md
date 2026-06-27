# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of static
method parameter decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L174`](../../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L174)

[TOC]

## Import

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';
```

Access this function as `StaticMethodParameters.validateArgs()`.

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
import { StaticMethodParameters } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!StaticMethodParameters.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to StaticMethodParameters.ICallbackFn parameters.
}
```
