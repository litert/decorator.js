# Typings - Legacy.ConstructorParameters

These TypeScript declarations describe the public contracts exported by Legacy.ConstructorParameters.

[TOC]

## Import

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class constructor parameter
decorators.

Source: [`packages/library/src/legacy/ConstructorParameterDecorators.ts#L38`](../../../../../packages/library/src/legacy/ConstructorParameterDecorators.ts#L38)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        _reserved: undefined,
        parameterIndex: number
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style constructor parameter
decorator callback.

Source: [`packages/library/src/legacy/ConstructorParameterDecorators.ts#L51`](../../../../../packages/library/src/legacy/ConstructorParameterDecorators.ts#L51)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.CONSTRUCTOR_PARAMETER;

    /**
     * The index of the parameter in the constructor parameter list. The index
     * is zero-based.
     */
    'parameterIndex': number;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class constructor parameter decorators.

Source: [`packages/library/src/legacy/ConstructorParameterDecorators.ts#L72`](../../../../../packages/library/src/legacy/ConstructorParameterDecorators.ts#L72)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
