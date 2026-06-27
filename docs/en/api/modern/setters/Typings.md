# Typings - Modern.Setters

These TypeScript declarations describe the public contracts exported by Modern.Setters.

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator';
import { Setters as SettersFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the member setter decorator callback function.

Source: [`packages/library/src/modern/SetterDecorators.ts#L26`](../../../../../packages/library/src/modern/SetterDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassSetterDecoratorContext<TThis, TValue> & { static: false; };
```

---

## Interface `ICallbackFn`

The callback function signature of class member setter decorators.

Source: [`packages/library/src/modern/SetterDecorators.ts#L33`](../../../../../packages/library/src/modern/SetterDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: (this: TThis, value: TValue) => void,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<(this: TThis, value: TValue) => void>;
}
```
