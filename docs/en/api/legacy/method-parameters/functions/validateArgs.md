# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
method parameter decorator or not.

> **Use in the decorator callback functions only.**

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L182`](../../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L182)

[TOC]

## Import

```ts
import { MethodParameters } from '@litert/decorator/legacy';
```

Access this function as `MethodParameters.validateArgs()`.

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
import { MethodParameters } from '@litert/decorator/legacy';

function decorator(...args: any[]): void {
    if (!MethodParameters.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to MethodParameters.ICallbackFn parameters.
}
```
