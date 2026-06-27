# Function `withArgsCheck`

Wrap a method parameter decorator callback function. The generated decorator
callback checks whether its arguments are in the form of a method parameter
decorator, and throws a TypeError when they are not.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L208`](../../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L208)

[TOC]

## Import

```ts
import { MethodParameters } from '@litert/decorator/legacy';
```

Access this function as `MethodParameters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The method parameter decorator callback function to be wrapped.

## Return Value

A new method parameter decorator function with the args check.

## Examples

```ts
import { MethodParameters } from '@litert/decorator/legacy';

const decorator = MethodParameters.withArgsCheck((...args) => {
    void args;
});
```
