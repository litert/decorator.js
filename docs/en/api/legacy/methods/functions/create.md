# Function `create`

Create a method decorator, with the given callback function in the unified
function style. The callback function will be called with a context object
when the method decorator is applied to a class member method. The context
object contains the constructor, prototype, method name, and descriptor of
the class member method.

Source: [`packages/library/src/legacy/MethodDecorators.ts#L153`](../../../../../../packages/library/src/legacy/MethodDecorators.ts#L153)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/legacy';
```

Access this function as `Methods.create()`.

## Signature

```ts
export function create(callback: tLoc.IUnifiedFn): tLoc.ICallbackFn;
```

## Parameters

- Parameter `callback`

  The method decorator callback function in the unified style.

## Return Value

A new method decorator function with the args check.

## Examples

```ts
import { Methods } from '@litert/decorator/legacy';

const decorator = Methods.create((ctx) => {
    void ctx;
});
```
