# Typings - Legacy.StaticProperties

These TypeScript declarations describe the public contracts exported by Legacy.StaticProperties.

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class static property decorators.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L37`](../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L37)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        propKey: string | symbol,
        dtr?: undefined
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style static property
decorator callback.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L50`](../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L50)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.STATIC_PROPERTY;

    /**
     * The name of the static property that the decorator is applied to.
     */
    'propertyName': string | symbol;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class static property decorators.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L70`](../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L70)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
