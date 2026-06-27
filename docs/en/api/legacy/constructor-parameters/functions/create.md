# Function `create`

Create a constructor parameter decorator with the given callback function in
the unified function style.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/ConstructorParameterDecorators.ts#L126`](../../../../../../packages/library/src/legacy/ConstructorParameterDecorators.ts#L126)

[TOC]

## Import

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';
```

Access this function as `ConstructorParameters.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The constructor parameter decorator callback function in unified style.

## Return Value

A new constructor parameter decorator function with the args check.

## Examples

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';

const decorator = ConstructorParameters.create((ctx) => {
    void ctx;
});
```
