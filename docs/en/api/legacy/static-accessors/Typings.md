# Typings - Legacy.StaticAccessors

These TypeScript declarations describe the public contracts exported by Legacy.StaticAccessors.

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class static accessor decorators.

Source: [`packages/library/src/legacy/StaticAccessorDecorators.ts#L38`](../../../../../packages/library/src/legacy/StaticAccessorDecorators.ts#L38)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        accessorName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style static accessor
decorator callback.

Source: [`packages/library/src/legacy/StaticAccessorDecorators.ts#L51`](../../../../../packages/library/src/legacy/StaticAccessorDecorators.ts#L51)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.STATIC_ACCESSOR;

    /**
     * The name of the static accessor that the decorator is applied to.
     */
    'accessorName': string | symbol;

    /**
     * The descriptor of the static accessor that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class static accessor decorators.

Source: [`packages/library/src/legacy/StaticAccessorDecorators.ts#L75`](../../../../../packages/library/src/legacy/StaticAccessorDecorators.ts#L75)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
