# Typings - Modern.Properties

These TypeScript declarations describe the public contracts exported by Modern.Properties.

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator';
import { Properties as PropertiesFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the member property decorator callback function.

Source: [`packages/library/src/modern/PropertyDecorators.ts#L26`](../../../../../packages/library/src/modern/PropertyDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassFieldDecoratorContext<TThis, TValue> & { static: false; };
```

---

## Interface `ICallbackFn`

The callback function signature of class member property decorators.

Source: [`packages/library/src/modern/PropertyDecorators.ts#L33`](../../../../../packages/library/src/modern/PropertyDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (value: TValue, ctx: IContext<TValue, TThis>): IMaybeVoid<TValue>;
}
```
