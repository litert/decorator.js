# Function `create`

Create a method parameter decorator with the given callback function in the
unified function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L143`](../../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L143)

[TOC]

## Import

```ts
import { MethodParameters } from '@litert/decorator/legacy';
```

Access this function as `MethodParameters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The method parameter decorator callback function in unified style.

## Return Value

A new method parameter decorator function with the args check.

## Examples

```ts
import { MethodParameters } from '@litert/decorator/legacy';

const decorator = MethodParameters.create((ctx) => {
    void ctx;
});
```
