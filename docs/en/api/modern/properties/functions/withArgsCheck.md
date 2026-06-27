# Function `withArgsCheck`

Wrap a property decorator callback function with the check of the arguments
passed to it are in the form of property decorator or not. If the arguments
is not in the form of property decorator, a TypeError will be thrown.

Source: [`packages/library/src/modern/PropertyDecorators.ts#L112`](../../../../../../packages/library/src/modern/PropertyDecorators.ts#L112)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator';
import { Properties as PropertiesFromModern } from '@litert/decorator/modern';
```

Access this function as `Properties.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The property decorator callback function to be wrapped.

## Return Value

A new property decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { Properties } from '@litert/decorator';

const decorator = Properties.withArgsCheck((...args) => {
    void args;
});
```
