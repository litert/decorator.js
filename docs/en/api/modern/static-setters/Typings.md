# Typings - Modern.StaticSetters

These TypeScript declarations describe the public contracts exported by Modern.StaticSetters.

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator';
import { StaticSetters as StaticSettersFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the static setter decorator callback function.

Source: [`packages/library/src/modern/StaticSetterDecorators.ts#L26`](../../../../../packages/library/src/modern/StaticSetterDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassSetterDecoratorContext<TThis, TValue> & { static: true; };
```

---

## Interface `ICallbackFn`

The callback function signature of static setter decorators.

Source: [`packages/library/src/modern/StaticSetterDecorators.ts#L33`](../../../../../packages/library/src/modern/StaticSetterDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: (this: TThis, value: TValue) => void,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<(this: TThis, value: TValue) => void>;
}
```
