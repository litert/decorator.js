# Typings - Legacy.Accessors

These TypeScript declarations describe the public contracts exported by Legacy.Accessors.

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class member accessor decorators.

Source: [`packages/library/src/legacy/AccessorDecorators.ts#L38`](../../../../../packages/library/src/legacy/AccessorDecorators.ts#L38)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        accessorName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style accessor decorator
callback.

Source: [`packages/library/src/legacy/AccessorDecorators.ts#L51`](../../../../../packages/library/src/legacy/AccessorDecorators.ts#L51)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.ACCESSOR;

    /**
     * The prototype of the class that the accessor decorator is applied to.
     */
    'prototype': tLib.IPrototype;

    /**
     * The name of the accessor that the decorator is applied to.
     */
    'accessorName': string | symbol;

    /**
     * The descriptor of the accessor that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class member accessor decorators.

Source: [`packages/library/src/legacy/AccessorDecorators.ts#L80`](../../../../../packages/library/src/legacy/AccessorDecorators.ts#L80)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
