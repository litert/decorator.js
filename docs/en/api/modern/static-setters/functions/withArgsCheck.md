# Function `withArgsCheck`

Wrap a static setter decorator callback function with the check of the
arguments passed to it are in the form of static setter decorator or not.
If the arguments is not in the form of static setter decorator, a TypeError
will be thrown.

Source: [`packages/library/src/modern/StaticSetterDecorators.ts#L116`](../../../../../../packages/library/src/modern/StaticSetterDecorators.ts#L116)

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator';
import { StaticSetters as StaticSettersFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticSetters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLib.ICallbackFn,
): tLib.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static setter decorator callback function to be wrapped.

## Return Value

A new static setter decorator function with the args check.

## Error Handling

- `TypeError` - If the arguments is invalid.

## Examples

```ts
import { StaticSetters } from '@litert/decorator';

const decorator = StaticSetters.withArgsCheck((...args) => {
    void args;
});
```
