# Typings - Legacy.StaticMethodParameters

These TypeScript declarations describe the public contracts exported by Legacy.StaticMethodParameters.

[TOC]

## Import

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of class static method parameter
decorators.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L39`](../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L39)

### Definition

```ts
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        methodName: string | symbol,
        parameterIndex: number
    ): void;
}
```

---

## Interface `IContext`

The context object passed to the unified function style static method
parameter decorator callback.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L52`](../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L52)

### Definition

```ts
export interface IContext extends tLib.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': C.EContextType.STATIC_METHOD_PARAMETER;

    /**
     * The name of the static method that owns the decorated parameter.
     */
    'methodName': string | symbol;

    /**
     * The index of the parameter in the static method parameter list. The
     * index is zero-based.
     */
    'parameterIndex': number;
}
```

---

## Interface `IUnifiedFn`

The unified function signature of class static method parameter
decorators.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L79`](../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L79)

### Definition

```ts
export interface IUnifiedFn {

    (ctx: IContext): void;
}
```
