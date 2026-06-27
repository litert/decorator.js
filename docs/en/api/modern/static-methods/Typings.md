# Typings - Modern.StaticMethods

These TypeScript declarations describe the public contracts exported by Modern.StaticMethods.

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator';
import { StaticMethods as StaticMethodsFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the static method decorator callback function.

Source: [`packages/library/src/modern/StaticMethodDecorators.ts#L27`](../../../../../packages/library/src/modern/StaticMethodDecorators.ts#L27)

### Definition

```ts
export type IContext<
    TFn extends tC.IFunction = tC.IFunction,
> = ClassMethodDecoratorContext<tC.IObject, TFn> & { static: true; };
```

---

## Interface `ICallbackFn`

The callback function signature of static method decorators.

Source: [`packages/library/src/modern/StaticMethodDecorators.ts#L34`](../../../../../packages/library/src/modern/StaticMethodDecorators.ts#L34)

### Definition

```ts
export interface ICallbackFn<
    T extends (...args: any[]) => any = (...args: any[]) => any
> {

    (method: T, ctx: IContext<T>): tC.IMaybeVoid<T>;
}
```
