# Function `withArgsCheck`

Wrap a static property decorator callback function with the check of the
arguments passed to it are in the form of static property decorator or not.
If the arguments is not in the form of static property decorator, a TypeError
will be thrown.

Source: [`packages/library/src/modern/StaticPropertyDecorators.ts#L113`](../../../../../../packages/library/src/modern/StaticPropertyDecorators.ts#L113)

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator';
import { StaticProperties as StaticPropertiesFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticProperties.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static property decorator callback function to be wrapped.

## Return Value

A new static property decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { StaticProperties } from '@litert/decorator';

const decorator = StaticProperties.withArgsCheck((...args) => {
    void args;
});
```
