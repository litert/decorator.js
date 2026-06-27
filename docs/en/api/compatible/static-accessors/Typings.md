# Typings - Compatible.StaticAccessors

These TypeScript declarations describe the public contracts exported by Compatible.StaticAccessors.

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy static accessor decorator context.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L30`](../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IModernContext`

The locally declared modern static accessor decorator context shape.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L35`](../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L35)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = tCompatible.IModernAccessorContext<true> & {

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

The compatible legacy implementation for a static accessor decorator.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L64`](../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L64)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): void;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a static accessor decorator.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L72`](../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L72)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> {

    (
        accessor: tCompatible.IModernAccessorTarget<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tCompatible.IModernAccessorResult<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible static accessor decorator.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L86`](../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L86)

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

The compatible static accessor decorator callback signature.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L102`](../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L102)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        accessorName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void;

    <TValue = any, TThis extends tC.IConstructor = tC.IConstructor>(
        accessor: tCompatible.IModernAccessorTarget<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tCompatible.IModernAccessorResult<TValue, TThis>>;
}
```
