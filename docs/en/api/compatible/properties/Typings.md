# Typings - Compatible.Properties

These TypeScript declarations describe the public contracts exported by Compatible.Properties.

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy member property decorator context.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L30`](../../../../../packages/library/src/compatible/PropertyDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IModernContext`

The locally declared modern member property decorator context shape.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L35`](../../../../../packages/library/src/compatible/PropertyDecorators.ts#L35)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis = any
> = tCompatible.IModernFieldContext<false> & {

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

The compatible legacy implementation for a member property decorator.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L64`](../../../../../packages/library/src/compatible/PropertyDecorators.ts#L64)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): void;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a member property decorator.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L72`](../../../../../packages/library/src/compatible/PropertyDecorators.ts#L72)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis = any
> {

    (
        value: undefined,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tCompatible.IModernFieldInitializer<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible member property decorator.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L86`](../../../../../packages/library/src/compatible/PropertyDecorators.ts#L86)

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

The compatible member property decorator callback signature.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L102`](../../../../../packages/library/src/compatible/PropertyDecorators.ts#L102)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        propertyName: T extends tC.IConstructor ? never : string | symbol,
        descriptor?: undefined
    ): void;

    <TValue = any, TThis = any>(
        value: undefined,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tCompatible.IModernFieldInitializer<TValue, TThis>>;
}
```
