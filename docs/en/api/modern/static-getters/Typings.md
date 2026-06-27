# Typings - Modern.StaticGetters

These TypeScript declarations describe the public contracts exported by Modern.StaticGetters.

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator';
import { StaticGetters as StaticGettersFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the static getter decorator callback function.

Source: [`packages/library/src/modern/StaticGetterDecorators.ts#L26`](../../../../../packages/library/src/modern/StaticGetterDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassGetterDecoratorContext<TThis, TValue> & { static: true; };
```

---

## Interface `ICallbackFn`

The callback function signature of static getter decorators.

Source: [`packages/library/src/modern/StaticGetterDecorators.ts#L33`](../../../../../packages/library/src/modern/StaticGetterDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: (this: TThis) => TValue,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<(this: TThis) => TValue>;
}
```
