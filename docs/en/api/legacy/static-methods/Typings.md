# Typings - Legacy.StaticMethods

These TypeScript declarations describe the public contracts exported by Legacy.StaticMethods.

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class static method decorators.

Source: [`packages/library/src/legacy/StaticMethodDecorators.ts#L39`](../../../../../packages/library/src/legacy/StaticMethodDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        methodName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style static method
decorator callback.

Source: [`packages/library/src/legacy/StaticMethodDecorators.ts#L52`](../../../../../packages/library/src/legacy/StaticMethodDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.STATIC_METHOD;

    /**
     * The name of the static method that the decorator is applied to.
     */
    'methodName': string | symbol;

    /**
     * The descriptor of the static method that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class static method decorators.

Source: [`packages/library/src/legacy/StaticMethodDecorators.ts#L78`](../../../../../packages/library/src/legacy/StaticMethodDecorators.ts#L78)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```
