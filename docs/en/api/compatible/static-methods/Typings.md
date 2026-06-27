# Typings - Compatible.StaticMethods

These TypeScript declarations describe the public contracts exported by Compatible.StaticMethods.

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy static method decorator context.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L30`](../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IModernContext`

The locally declared modern static method decorator context shape.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L35`](../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L35)

### Definition

```ts
export type IModernContext<
    TFn extends tC.IFunction = tC.IFunction,
    TThis extends tC.IConstructor = tC.IConstructor
> = tCompatible.IModernMethodContext<true> & {

    /**
     * Access helpers provided by the standard decorator context.
     */
    readonly access?: {
        /**
         * Read the decorated value from an instance.
         */
        get?(object: TThis): TFn;
    };
};
```

---

## Interface `ILegacyFn`

The compatible legacy implementation for a static method decorator.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L54`](../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L54)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a static method decorator.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L62`](../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L62)

### Definition

```ts
export interface IModernFn<
    TFn extends tC.IFunction = tC.IFunction,
    TThis extends tC.IConstructor = tC.IConstructor
> {

    (method: TFn, ctx: IModernContext<TFn, TThis>): tC.IMaybeVoid<TFn>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible static method decorator.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L73`](../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L73)

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

The compatible static method decorator callback signature.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L89`](../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L89)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        methodName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TFn extends tC.IFunction, TThis extends tC.IConstructor = tC.IConstructor>(
        method: TFn,
        ctx: IModernContext<TFn, TThis>
    ): tC.IMaybeVoid<TFn>;
}
```
