# Function `withArgsCheck`

Wrap a static accessor decorator callback function with the check of the
arguments passed to it are in the form of static accessor decorator or not.
If the arguments is not in the form of static accessor decorator, a TypeError
will be thrown.

Source: [`packages/library/src/modern/StaticAccessorDecorators.ts#L119`](../../../../../../packages/library/src/modern/StaticAccessorDecorators.ts#L119)

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator';
import { StaticAccessors as StaticAccessorsFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticAccessors.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static accessor decorator callback function to be wrapped.

## Return Value

A new static accessor decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { StaticAccessors } from '@litert/decorator';

const decorator = StaticAccessors.withArgsCheck((...args) => {
    void args;
});
```
