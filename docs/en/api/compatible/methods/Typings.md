# Typings - Compatible.Methods

These TypeScript declarations describe the public contracts exported by Compatible.Methods.

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy member method decorator context.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L30`](../../../../../packages/library/src/compatible/MethodDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `IModernContext`

The locally declared modern member method decorator context shape.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L35`](../../../../../packages/library/src/compatible/MethodDecorators.ts#L35)

### Definition

```ts
export type IModernContext<
    TFn extends tC.IFunction = tC.IFunction,
    TThis = any
> = tCompatible.IModernMethodContext<false> & {

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

The compatible legacy implementation for a member method decorator.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L54`](../../../../../packages/library/src/compatible/MethodDecorators.ts#L54)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a member method decorator.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L62`](../../../../../packages/library/src/compatible/MethodDecorators.ts#L62)

### Definition

```ts
export interface IModernFn<
    TFn extends tC.IFunction = tC.IFunction,
    TThis = any
> {

    (method: TFn, ctx: IModernContext<TFn, TThis>): tC.IMaybeVoid<TFn>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible member method decorator.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L73`](../../../../../packages/library/src/compatible/MethodDecorators.ts#L73)

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

The compatible member method decorator callback signature.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L89`](../../../../../packages/library/src/compatible/MethodDecorators.ts#L89)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        methodName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TFn extends tC.IFunction, TThis = any>(
        method: TFn,
        ctx: IModernContext<TFn, TThis>
    ): tC.IMaybeVoid<TFn>;
}
```
