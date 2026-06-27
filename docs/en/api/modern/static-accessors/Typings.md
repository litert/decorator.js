# Typings - Modern.StaticAccessors

These TypeScript declarations describe the public contracts exported by Modern.StaticAccessors.

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator';
import { StaticAccessors as StaticAccessorsFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the static accessor decorator callback function.

Source: [`packages/library/src/modern/StaticAccessorDecorators.ts#L26`](../../../../../packages/library/src/modern/StaticAccessorDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassAccessorDecoratorContext<TThis, TValue> & { static: true; };
```

---

## Interface `ICallbackFn`

The callback function signature of static accessor decorators.

Source: [`packages/library/src/modern/StaticAccessorDecorators.ts#L33`](../../../../../packages/library/src/modern/StaticAccessorDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: ClassAccessorDecoratorTarget<TThis, TValue>,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<ClassAccessorDecoratorResult<TThis, TValue>>;
}
```
