# Typings - Modern.Getters

These TypeScript declarations describe the public contracts exported by Modern.Getters.

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator';
import { Getters as GettersFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the member getter decorator callback function.

Source: [`packages/library/src/modern/GetterDecorators.ts#L26`](../../../../../packages/library/src/modern/GetterDecorators.ts#L26)

### Definition

```ts
export type IContext<
    TValue = any, TThis = any
> = ClassGetterDecoratorContext<TThis, TValue> & { static: false; };
```

---

## Interface `ICallbackFn`

The callback function signature of class member getter decorators.

Source: [`packages/library/src/modern/GetterDecorators.ts#L33`](../../../../../packages/library/src/modern/GetterDecorators.ts#L33)

### Definition

```ts
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: (this: TThis) => TValue,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<(this: TThis) => TValue>;
}
```
