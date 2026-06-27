# Typings - Legacy.StaticGetters

These TypeScript declarations describe the public contracts exported by Legacy.StaticGetters.

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class static getter decorators.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L39`](../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        getterName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style static getter
decorator callback.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L52`](../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.STATIC_GETTER;

    /**
     * The name of the static getter that the decorator is applied to.
     */
    'getterName': string | symbol;

    /**
     * The descriptor of the static getter that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class static getter decorators.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L78`](../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L78)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```
