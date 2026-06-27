# Typings - Legacy.Setters

These TypeScript declarations describe the public contracts exported by Legacy.Setters.

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class member setter decorators.

Source: [`packages/library/src/legacy/SetterDecorators.ts#L39`](../../../../../packages/library/src/legacy/SetterDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        setterName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style setter decorator
callback.

Source: [`packages/library/src/legacy/SetterDecorators.ts#L52`](../../../../../packages/library/src/legacy/SetterDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.SETTER;

    /**
     * The prototype of the class that the setter decorator is applied to.
     */
    'prototype': tLib.IPrototype;

    /**
     * The name of the setter that the decorator is applied to.
     */
    'setterName': string | symbol;

    /**
     * The descriptor of the setter that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class member setter decorators.

Source: [`packages/library/src/legacy/SetterDecorators.ts#L83`](../../../../../packages/library/src/legacy/SetterDecorators.ts#L83)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```
