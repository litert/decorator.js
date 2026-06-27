# Typings - Legacy.Properties

These TypeScript declarations describe the public contracts exported by Legacy.Properties.

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class member property decorators.

Source: [`packages/library/src/legacy/PropertyDecorators.ts#L37`](../../../../../packages/library/src/legacy/PropertyDecorators.ts#L37)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        propKey: string | symbol,
        dtr?: undefined
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style property decorator
callback.

Source: [`packages/library/src/legacy/PropertyDecorators.ts#L50`](../../../../../packages/library/src/legacy/PropertyDecorators.ts#L50)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.PROPERTY;

    /**
     * The prototype of the class that the property decorator is applied to.
     */
    'prototype': tLib.IPrototype;

    /**
     * The name of the property that the property decorator is applied to.
     */
    'propertyName': string | symbol;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class member property decorators.

Source: [`packages/library/src/legacy/PropertyDecorators.ts#L75`](../../../../../packages/library/src/legacy/PropertyDecorators.ts#L75)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
