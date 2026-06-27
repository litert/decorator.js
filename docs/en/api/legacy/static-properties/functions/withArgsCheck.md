# Function `withArgsCheck`

Wrap a static property decorator callback function. The generated decorator
callback checks whether its arguments are in the form of a static property
decorator, and throws a TypeError when they are not.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L190`](../../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L190)

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/legacy';
```

Access this function as `StaticProperties.withArgsCheck()`.

## Signature

```ts
export function withArgsCheck(
    callback: tLoc.ICallbackFn,
): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static property decorator callback function to be wrapped.

## Return Value

A new static property decorator function with the args check.

## Examples

```ts
import { StaticProperties } from '@litert/decorator/legacy';

const decorator = StaticProperties.withArgsCheck((...args) => {
    void args;
});
```
