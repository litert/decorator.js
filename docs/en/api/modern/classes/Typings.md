# Typings - Modern.Classes

These TypeScript declarations describe the public contracts exported by Modern.Classes.

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator';
import { Classes as ClassesFromModern } from '@litert/decorator/modern';
```

## Type Alias `IContext`

The context object passed to the class decorator callback function.

Source: [`packages/library/src/modern/ClassDecorators.ts#L27`](../../../../../packages/library/src/modern/ClassDecorators.ts#L27)

### Definition

```ts
export type IContext<
    T extends tC.IConstructor = tC.IConstructor
> = ClassDecoratorContext<T>;
```

---

## Interface `ICallbackFn`

The callback function signature of class decorators.

Source: [`packages/library/src/modern/ClassDecorators.ts#L34`](../../../../../packages/library/src/modern/ClassDecorators.ts#L34)

### Definition

```ts
export interface ICallbackFn<T extends tC.IConstructor = tC.IConstructor> {

    (ctor: T, ctx: IContext<T>): void;
}
```
