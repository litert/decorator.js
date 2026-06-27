# Typings - Compatible.Getters

These TypeScript declarations describe the public contracts exported by Compatible.Getters.

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy member getter decorator context.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L30`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IGetterFn`

The member getter function value handled by a modern decorator.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L35`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L35)

### Definition

```ts
export type IGetterFn<TValue = any, TThis = any> = (this: TThis) => TValue;
```

---

## Type Alias `IModernContext`

The locally declared modern member getter decorator context shape.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L40`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L40)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis = any
> = tCompatible.IModernGetterContext<false> & {

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

The compatible legacy implementation for a member getter decorator.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L59`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L59)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a member getter decorator.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L67`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L67)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis = any
> {

    (
        getter: IGetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<IGetterFn<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible member getter decorator.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L81`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L81)

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

The compatible member getter decorator callback signature.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L97`](../../../../../packages/library/src/compatible/GetterDecorators.ts#L97)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        getterName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TValue = any, TThis = any>(
        getter: IGetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<IGetterFn<TValue, TThis>>;
}
```
