# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of member
property decorator or not.

> **Use in the decorator callback functions only.**

Source: [`packages/library/src/modern/PropertyDecorators.ts#L84`](../../../../../../packages/library/src/modern/PropertyDecorators.ts#L84)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator';
import { Properties as PropertiesFromModern } from '@litert/decorator/modern';
```

Access this function as `Properties.validateArgs()`.

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
import { Properties } from '@litert/decorator';

function decorator(...args: any[]): void {
    if (!Properties.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Properties.ICallbackFn parameters.
}
```
