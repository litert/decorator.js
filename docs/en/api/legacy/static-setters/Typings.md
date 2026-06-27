# Typings - Legacy.StaticSetters

These TypeScript declarations describe the public contracts exported by Legacy.StaticSetters.

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class static setter decorators.

Source: [`packages/library/src/legacy/StaticSetterDecorators.ts#L39`](../../../../../packages/library/src/legacy/StaticSetterDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        setterName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IContext`

The context object passed to the unified function style static setter
decorator callback.

Source: [`packages/library/src/legacy/StaticSetterDecorators.ts#L52`](../../../../../packages/library/src/legacy/StaticSetterDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.STATIC_SETTER;

    /**
     * The name of the static setter that the decorator is applied to.
     */
    'setterName': string | symbol;

    /**
     * The descriptor of the static setter that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class static setter decorators.

Source: [`packages/library/src/legacy/StaticSetterDecorators.ts#L78`](../../../../../packages/library/src/legacy/StaticSetterDecorators.ts#L78)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```
