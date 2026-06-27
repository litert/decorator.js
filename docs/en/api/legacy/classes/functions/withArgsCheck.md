# Function `withArgsCheck`

Wrap a class decorator callback function. The generated decorator callback
checks whether its arguments are in the form of a class decorator, and
throws a TypeError when they are not.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L193`](../../../../../../packages/library/src/legacy/ClassDecorators.ts#L193)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/legacy';
```

Access this function as `Classes.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The class decorator callback function to be wrapped.

## Return Value

A new class decorator function with the args check.

## Examples

```ts
import { Classes } from '@litert/decorator/legacy';

const decorator = Classes.withArgsCheck((...args) => {
    void args;
});
```
