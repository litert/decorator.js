# Typings - Legacy.Methods

These TypeScript declarations describe the public contracts exported by Legacy.Methods.

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class member method decorators.

Source: [`packages/library/src/legacy/MethodDecorators.ts#L39`](../../../../../packages/library/src/legacy/MethodDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        methodName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style method decorator
callback.

Source: [`packages/library/src/legacy/MethodDecorators.ts#L52`](../../../../../packages/library/src/legacy/MethodDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.METHOD;

    /**
     * The prototype of the class that the method decorator is applied to.
     */
    'prototype': tLib.IPrototype;

    /**
     * The name of the method that the method decorator is applied to. It can
     * be a string or a symbol.
     */
    'methodName': string | symbol;

    /**
     * The descriptor of the method that the method decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class member method decorators.

Source: [`packages/library/src/legacy/MethodDecorators.ts#L84`](../../../../../packages/library/src/legacy/MethodDecorators.ts#L84)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```
