# Typings - Compatible.StaticSetters

These TypeScript declarations describe the public contracts exported by Compatible.StaticSetters.

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy static setter decorator context.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L30`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `ISetterFn`

The static setter function value handled by a modern decorator.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L35`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L35)

### Definition

```ts
export type ISetterFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = (
    this: TThis,
    value: TValue
) => void;
```

---

## Type Alias `IModernContext`

The locally declared modern static setter decorator context shape.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L46`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L46)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = tCompatible.IModernSetterContext<true> & {

    /**
     * Access helpers provided by the standard decorator context.
     */
    readonly access?: {
        /**
         * Write the decorated value on an instance.
         */
        set?(object: TThis, value: TValue): void;
    };
};
```

---

## Interface `ILegacyFn`

The compatible legacy implementation for a static setter decorator.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L65`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L65)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a static setter decorator.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L73`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L73)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> {

    (
        setter: ISetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<ISetterFn<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible static setter decorator.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L87`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L87)

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

The compatible static setter decorator callback signature.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L103`](../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L103)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        setterName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TValue = any, TThis extends tC.IConstructor = tC.IConstructor>(
        setter: ISetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<ISetterFn<TValue, TThis>>;
}
```
