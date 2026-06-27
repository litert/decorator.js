# Function `withArgsCheck`

Wrap a static getter decorator callback function with the check of the
arguments passed to it are in the form of static getter decorator or not.
If the arguments is not in the form of static getter decorator, a TypeError
will be thrown.

Source: [`packages/library/src/modern/StaticGetterDecorators.ts#L116`](../../../../../../packages/library/src/modern/StaticGetterDecorators.ts#L116)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator';
import { StaticGetters as StaticGettersFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticGetters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static getter decorator callback function to be wrapped.

## Return Value

A new static getter decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { StaticGetters } from '@litert/decorator';

const decorator = StaticGetters.withArgsCheck((...args) => {
    void args;
});
```
