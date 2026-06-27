# Function `validateArgs`

Check the arguments passed to a decorator function are in the form of class
decorator or not.

> **Use in the decorator callback functions only.**

Source: [`packages/library/src/modern/ClassDecorators.ts#L80`](../../../../../../packages/library/src/modern/ClassDecorators.ts#L80)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator';
import { Classes as ClassesFromModern } from '@litert/decorator/modern';
```

Access this function as `Classes.validateArgs()`.

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
import { Classes } from '@litert/decorator';

function decorator(...args: any[]): void {
    if (!Classes.validateArgs(args)) {
        throw new TypeError('Invalid decorator usage.');
    }

    // Arguments are now narrowed to Classes.ICallbackFn parameters.
}
```
