# Typings - Legacy

These TypeScript declarations describe the public contracts exported by Legacy.

[TOC]

## Import

```ts
import type * as Decorators from '@litert/decorator/legacy';
```

## Interface `IPrototype`

The `prototype` object type of a class constructor.

Source: [`packages/library/src/legacy/Typings.ts#L29`](../../../../packages/library/src/legacy/Typings.ts#L29)

### Definition

```ts
export interface IPrototype<T extends IConstructor = IConstructor> extends Record<string, any> {

    /**
     * The constructor that owns the prototype object.
     */
    constructor: T;
}
```

---

## Interface `IContextBase`

The common context fields shared by all unified legacy decorator callbacks.

Source: [`packages/library/src/legacy/Typings.ts#L40`](../../../../packages/library/src/legacy/Typings.ts#L40)

### Definition

```ts
export interface IContextBase {

    /**
     * The type of the decorator.
     */
    'type': EContextType;

    /**
     * The constructor of the class that the decorator is applied to.
     */
    'constructor': IConstructor;
}
```

---

## Type Alias `IConstructor`

Constructor helper type re-exported from `@litert/utils-ts-types` for legacy decorator contexts.

Source: [`packages/library/src/legacy/Typings.ts#L24`](../../../../packages/library/src/legacy/Typings.ts#L24)

### Definition

```ts
export type { IConstructor } from '@litert/utils-ts-types';
```

---

## Type Alias `IInstanceOf`

Instance helper type re-exported from `@litert/utils-ts-types` for legacy decorator contexts.

Source: [`packages/library/src/legacy/Typings.ts#L24`](../../../../packages/library/src/legacy/Typings.ts#L24)

### Definition

```ts
export type { IInstanceOf } from '@litert/utils-ts-types';
```
