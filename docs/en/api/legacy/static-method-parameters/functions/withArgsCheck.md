# Function `withArgsCheck`

Wrap a static method parameter decorator callback function. The generated
decorator callback checks whether its arguments are in the form of a static
method parameter decorator, and throws a TypeError when they are not.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L202`](../../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L202)

[TOC]

## Import

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';
```

Access this function as `StaticMethodParameters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static method parameter decorator callback function to be wrapped.

## Return Value

A new static method parameter decorator function with the argument check.

## Examples

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';

const decorator = StaticMethodParameters.withArgsCheck((...args) => {
    void args;
});
```
