# Typings - Compatible.StaticGetters

These TypeScript declarations describe the public contracts exported by Compatible.StaticGetters.

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy static getter decorator context.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L30`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IGetterFn`

The static getter function value handled by a modern decorator.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L35`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L35)

### Definition

```ts
export type IGetterFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = (this: TThis) => TValue;
```

---

## Type Alias `IModernContext`

The locally declared modern static getter decorator context shape.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L43`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L43)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = tCompatible.IModernGetterContext<true> & {

    /**
     * Access helpers provided by the standard decorator context.
     */
    readonly access?: {
        /**
         * Read the decorated value from an instance.
         */
        get?(object: TThis): TValue;
    };
};
```

---

## Interface `ILegacyFn`

The legacy implementation callback used by Compatible.StaticGetters.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L62`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L62)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a static getter decorator.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L70`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L70)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> {

    (
        getter: IGetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<IGetterFn<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible static getter decorator.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L84`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L84)

### Definition

```ts
export interface ICreateOptions {

    /**
     * The implementation used by legacy ECMAScript decorators.
     */
    readonly legacy: ILegacyFn;

    /**
     * The implementation used by modern ECMAScript decorators.
     */
    readonly modern: IModernFn;
}
```

---

## Interface `ICallbackFn`

The compatible static getter decorator callback signature.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L100`](../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L100)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        getterName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TValue = any, TThis extends tC.IConstructor = tC.IConstructor>(
        getter: IGetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<IGetterFn<TValue, TThis>>;
}
```
