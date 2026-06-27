# Typings - Compatible.Setters

These TypeScript declarations describe the public contracts exported by Compatible.Setters.

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/compatible';
```

## Type Alias `ILegacyContext`

The normalized legacy member setter decorator context.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L30`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L30)

### Definition

```ts
export type ILegacyContext = tLegacy.IContext;
```

---

## Type Alias `ISetterFn`

The member setter function value handled by a modern decorator.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L35`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L35)

### Definition

```ts
export type ISetterFn<TValue = any, TThis = any> = (
    this: TThis,
    value: TValue
) => void;
```

---

## Type Alias `IModernContext`

The locally declared modern member setter decorator context shape.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L43`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L43)

### Definition

```ts
export type IModernContext<
    TValue = any,
    TThis = any
> = tCompatible.IModernSetterContext<false> & {

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

The compatible legacy implementation for a member setter decorator.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L62`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L62)

### Definition

```ts
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}
```

---

## Interface `IModernFn`

The compatible modern implementation for a member setter decorator.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L70`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L70)

### Definition

```ts
export interface IModernFn<
    TValue = any,
    TThis = any
> {

    (
        setter: ISetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<ISetterFn<TValue, TThis>>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible member setter decorator.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L84`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L84)

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

The compatible member setter decorator callback signature.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L100`](../../../../../packages/library/src/compatible/SetterDecorators.ts#L100)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        setterName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TValue = any, TThis = any>(
        setter: ISetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<ISetterFn<TValue, TThis>>;
}
```
