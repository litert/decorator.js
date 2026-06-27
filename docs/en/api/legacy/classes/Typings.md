# Typings - Legacy.Classes

These TypeScript declarations describe the public contracts exported by Legacy.Classes.

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class decorators.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L35`](../../../../../packages/library/src/legacy/ClassDecorators.ts#L35)

### Definition

```ts
export interface ICallbackFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T
    ): tC.IMaybeVoid<T>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style class decorator
callback.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L46`](../../../../../packages/library/src/legacy/ClassDecorators.ts#L46)

### Definition

```ts
export interface IContext<
    T extends tC.IConstructor = tC.IConstructor
> extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.CLASS;

    /**
     * The constructor of the class that the decorator is applied to.
     */
    'constructor': T;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class decorators.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L69`](../../../../../packages/library/src/legacy/ClassDecorators.ts#L69)

### Definition

```ts
export interface IUnifiedFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctx: IContext<T>
    ): tC.IMaybeVoid<T>;
}
```
