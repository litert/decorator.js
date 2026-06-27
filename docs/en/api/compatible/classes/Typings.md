# Typings - Compatible.Classes

These TypeScript declarations describe the public contracts exported by Compatible.Classes.

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/compatible';
```

## Interface `ILegacyContext`

The legacy class decorator context passed to the compatible legacy callback.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L29`](../../../../../packages/library/src/compatible/ClassDecorators.ts#L29)

### Definition

```ts
export interface ILegacyContext<
    T extends tC.IConstructor = tC.IConstructor
> {

    /**
     * The type of the decorator.
     */
    'type': 'class';

    /**
     * The constructor of the class that the decorator is applied to.
     */
    'constructor': T;
}
```

---

## Interface `IModernContext`

Minimal modern class decorator context shape.

This type is declared locally so the compatible entrypoint does not depend on
TypeScript's built-in decorator lib declarations being available to users.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L50`](../../../../../packages/library/src/compatible/ClassDecorators.ts#L50)

### Definition

```ts
export interface IModernContext<
    T extends tC.IConstructor = tC.IConstructor
> {

    /**
     * The kind of decorator context.
     */
    'kind': 'class';

    /**
     * The class name reported by the standard decorator context.
     */
    'name'?: string;

    /**
     * Register an initializer to run after class definition evaluation.
     */
    'addInitializer'?: (initializer: (this: T) => void) => void;

    /**
     * Metadata storage provided by TypeScript's standard decorators transform.
     */
    'metadata'?: Record<PropertyKey, unknown>;
}
```

---

## Interface `ILegacyFn`

The compatible legacy class decorator implementation.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L81`](../../../../../packages/library/src/compatible/ClassDecorators.ts#L81)

### Definition

```ts
export interface ILegacyFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctx: ILegacyContext<T>
    ): tC.IMaybeVoid<T>;
}
```

---

## Interface `IModernFn`

The compatible modern class decorator implementation.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L95`](../../../../../packages/library/src/compatible/ClassDecorators.ts#L95)

### Definition

```ts
export interface IModernFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T,
        ctx: IModernContext<T>
    ): tC.IMaybeVoid<T>;
}
```

---

## Interface `ICreateOptions`

The options used to create a compatible class decorator.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L106`](../../../../../packages/library/src/compatible/ClassDecorators.ts#L106)

### Definition

```ts
export interface ICreateOptions {

    /**
     * The implementation used by legacy ECMAScript decorators.
     */
    'legacy': ILegacyFn;

    /**
     * The implementation used by modern ECMAScript decorators.
     */
    'modern': IModernFn;
}
```

---

## Interface `ICallbackFn`

The compatible class decorator callback signature.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L127`](../../../../../packages/library/src/compatible/ClassDecorators.ts#L127)

### Definition

```ts
export interface ICallbackFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T,
        ctx?: IModernContext<T>
    ): tC.IMaybeVoid<T>;
}
```
