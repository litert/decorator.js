# Typings - Modern.StaticProperties

These TypeScript declarations describe the public contracts exported by Modern.StaticProperties.

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator';
import { StaticProperties as StaticPropertiesFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the static property decorator callback function.

Source: [`packages/library/src/modern/StaticPropertyDecorators.ts#L26`](../../../../../packages/library/src/modern/StaticPropertyDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassFieldDecoratorContext<TThis, TValue> & { static: true; };
```

---

## Interface `ICallbackFn`

The callback function signature of static property decorators.

Source: [`packages/library/src/modern/StaticPropertyDecorators.ts#L33`](../../../../../packages/library/src/modern/StaticPropertyDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (value: TValue, ctx: IContext<TValue, TThis>): IMaybeVoid<TValue>;
}
```
