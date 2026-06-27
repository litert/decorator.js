# Function `withArgsCheck`

Wrap a method decorator callback function. The generated decorator callback
checks whether its arguments are in the form of a method decorator, and
throws a TypeError when they are not.

Source: [`packages/library/src/legacy/MethodDecorators.ts#L220`](../../../../../../packages/library/src/legacy/MethodDecorators.ts#L220)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/legacy';
```

Access this function as `Methods.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(callback: tLoc.ICallbackFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The method decorator callback function to be wrapped.

## Return Value

A new method decorator function with the args check.

## Examples

```ts
import { Methods } from '@litert/decorator/legacy';

const decorator = Methods.withArgsCheck((...args) => {
    void args;
});
```
