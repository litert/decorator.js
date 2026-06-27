# Typings - Modern.Accessors

These TypeScript declarations describe the public contracts exported by Modern.Accessors.

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator';
import { Accessors as AccessorsFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the member accessor decorator callback function.

Source: [`packages/library/src/modern/AccessorDecorators.ts#L26`](../../../../../packages/library/src/modern/AccessorDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassAccessorDecoratorContext<TThis, TValue> & { static: false; };
```

---

## Interface `ICallbackFn`

The callback function signature of class member accessor decorators.

Source: [`packages/library/src/modern/AccessorDecorators.ts#L33`](../../../../../packages/library/src/modern/AccessorDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: ClassAccessorDecoratorTarget<TThis, TValue>,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<ClassAccessorDecoratorResult<TThis, TValue>>;
}
```
