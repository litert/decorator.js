# Typings - Modern.Methods

These TypeScript declarations describe the public contracts exported by Modern.Methods.

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator';
import { Methods as MethodsFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the member method decorator callback function.

Source: [`packages/library/src/modern/MethodDecorators.ts#L27`](../../../../../packages/library/src/modern/MethodDecorators.ts#L27)

### Definition

```ts
export type IContext<
    TFn extends tC.IFunction = tC.IFunction,
> = ClassMethodDecoratorContext<tC.IObject, TFn> & { static: false; };
```

---

## Interface `ICallbackFn`

The callback function signature of class member method decorators.

Source: [`packages/library/src/modern/MethodDecorators.ts#L34`](../../../../../packages/library/src/modern/MethodDecorators.ts#L34)

### Definition

```ts
export interface ICallbackFn<
    T extends (...args: any[]) => any = (...args: any[]) => any
> {

    (method: T, ctx: IContext<T>): tC.IMaybeVoid<T>;
}
```
