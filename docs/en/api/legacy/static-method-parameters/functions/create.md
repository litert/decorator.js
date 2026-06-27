# Function `create`

Create a static method parameter decorator with the given callback function
in the unified function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L135`](../../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L135)

[TOC]

## Import

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';
```

Access this function as `StaticMethodParameters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The static method parameter decorator callback function in unified style.

## Return Value

A new static method parameter decorator function with the args check.

## Examples

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';

const decorator = StaticMethodParameters.create((ctx) => {
    void ctx;
});
```
