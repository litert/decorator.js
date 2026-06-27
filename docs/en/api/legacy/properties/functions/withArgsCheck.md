# Function `withArgsCheck`

Wrap a property decorator callback function. The generated decorator
callback checks whether its arguments are in the form of a property
decorator, and throws a TypeError when they are not.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/PropertyDecorators.ts#L196`](../../../../../../packages/library/src/legacy/PropertyDecorators.ts#L196)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/legacy';
```

Access this function as `Properties.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The property decorator callback function to be wrapped.

## Return Value

A new property decorator function with the args check.

## Examples

```ts
import { Properties } from '@litert/decorator/legacy';

const decorator = Properties.withArgsCheck((...args) => {
    void args;
});
```
