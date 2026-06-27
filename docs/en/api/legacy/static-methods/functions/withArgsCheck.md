# Function `withArgsCheck`

Wrap a static method decorator callback function. The generated decorator
callback checks whether its arguments are in the form of a static method
decorator, and throws a TypeError when they are not.

Source: [`packages/library/src/legacy/StaticMethodDecorators.ts#L204`](../../../../../../packages/library/src/legacy/StaticMethodDecorators.ts#L204)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/legacy';
```

Access this function as `StaticMethods.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static method decorator callback function to be wrapped.

## Return Value

A new static method decorator function with the args check.

## Examples

```ts
import { StaticMethods } from '@litert/decorator/legacy';

const decorator = StaticMethods.withArgsCheck((...args) => {
    void args;
});
```
