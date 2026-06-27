# Typings - Compatible.StaticProperties

These TypeScript declarations describe the public contracts exported by Compatible.StaticProperties.

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy static property decorator context.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L30`](../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IModernContext`

The locally declared modern static property decorator context shape.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L35`](../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L35)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = tCompatible.IModernFieldContext<true> & {

    /**
     * Access helpers provided by the standard decorator context.
     */
    readonly access?: {
        /**
         * Read the decorated value from an instance.
         */
        get?(object: TThis): TValue;

        /**
         * Write the decorated value on an instance.
         */
        set?(object: TThis, value: TValue): void;

        /**
         * Check whether an instance has the decorated value.
         */
        has?(object: TThis): boolean;
    };
};
```

---

## Interface `ILegacyFn`

The compatible legacy implementation for a static property decorator.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L64`](../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L64)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): void;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a static property decorator.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L72`](../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L72)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> {

    (
        value: undefined,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tCompatible.IModernFieldInitializer<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible static property decorator.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L86`](../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L86)

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

The compatible static property decorator callback signature.

Source: [`packages/library/src/compatible/StaticPropertyDecorators.ts#L102`](../../../../../packages/library/src/compatible/StaticPropertyDecorators.ts#L102)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        propertyName: string | symbol,
        descriptor?: undefined
    ): void;

    <TValue = any, TThis extends tC.IConstructor = tC.IConstructor>(
        value: undefined,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tCompatible.IModernFieldInitializer<TValue, TThis>>;
}
```
