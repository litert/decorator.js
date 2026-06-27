# Function `withArgsCheck`

Wrap a constructor parameter decorator callback function. The generated
decorator callback checks whether its arguments are in the form of a
constructor parameter decorator, and throws a TypeError when they are not.

Source: [`packages/library/src/legacy/ConstructorParameterDecorators.ts#L188`](../../../../../../packages/library/src/legacy/ConstructorParameterDecorators.ts#L188)

[TOC]

## Import

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';
```

Access this function as `ConstructorParameters.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The constructor parameter decorator callback function to be wrapped.

## Return Value

A new constructor parameter decorator function with the argument check.

## Examples

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';

const decorator = ConstructorParameters.withArgsCheck((...args) => {
    void args;
});
```
