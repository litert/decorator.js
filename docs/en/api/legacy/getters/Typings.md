# Typings - Legacy.Getters

These TypeScript declarations describe the public contracts exported by Legacy.Getters.

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class member getter decorators.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L39`](../../../../../packages/library/src/legacy/GetterDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        getterName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style getter decorator
callback.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L52`](../../../../../packages/library/src/legacy/GetterDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.GETTER;

    /**
     * The prototype of the class that the getter decorator is applied to.
     */
    'prototype': tLib.IPrototype;

    /**
     * The name of the getter that the decorator is applied to.
     */
    'getterName': string | symbol;

    /**
     * The descriptor of the getter that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class member getter decorators.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L83`](../../../../../packages/library/src/legacy/GetterDecorators.ts#L83)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```
