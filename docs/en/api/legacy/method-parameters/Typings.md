# Typings - Legacy.MethodParameters

These TypeScript declarations describe the public contracts exported by Legacy.MethodParameters.

[TOC]

## Import

```ts
import { MethodParameters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class member method parameter
decorators.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L39`](../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    <T>(
        prototype: T,
        methodName: T extends tC.IConstructor ? never : string | symbol,
        parameterIndex: number
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style method parameter
decorator callback.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L52`](../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.METHOD_PARAMETER;

    /**
     * The prototype of the class that the method parameter decorator is
     * applied to.
     */
    'prototype': tLib.IPrototype;

    /**
     * The name of the method that owns the decorated parameter.
     */
    'methodName': string | symbol;

    /**
     * The index of the parameter in the method parameter list. The index is
     * zero-based.
     */
    'parameterIndex': number;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class member method parameter
decorators.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L85`](../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L85)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
