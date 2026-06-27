# Typings - Legacy.GeneralDecorators

These TypeScript declarations describe the public contracts exported by Legacy.GeneralDecorators.

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';
```

## Interface `ICallbackFn`

The callback function signature of legacy general decorators.

It accepts class decorators and the non-class decorator forms supported by
TypeScript's experimental decorators transform.

Source: [`packages/library/src/legacy/GeneralDecorators.ts#L44`](../../../../../packages/library/src/legacy/GeneralDecorators.ts#L44)

### Definition

```ts
export interface ICallbackFn {

    (target: tC.IConstructor): any;

    (target: tC.IObject, propertyKey: undefined | string | symbol, index?: any): any;
}
```

---

## Interface `IGeneralDecoratorOptions`

Options used to create a general decorator with Legacy.GeneralDecorators.

Source: [`packages/library/src/legacy/GeneralDecorators.ts#L149`](../../../../../packages/library/src/legacy/GeneralDecorators.ts#L149)

### Definition

```ts
export interface IGeneralDecoratorOptions {

    /**
     * Specifies that the general decorator can be used as a class decorator,
     * and provides the callback function for this usage case.
     */
    onClass?: mClass.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a member accessor
     * decorator, and provides the callback function for this usage case.
     *
     * This option has higher applying priority than `onGetter` and `onSetter`.
     */
    onAccessor?: mAccessor.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a member getter
     * decorator, and provides the callback function for this usage case.
     *
     * This option has the same applying priority as `onSetter`, and lower
     * applying priority than `onAccessor`.
     */
    onGetter?: mGetter.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a member setter
     * decorator, and provides the callback function for this usage case.
     *
     * This option has the same applying priority as `onGetter`, and lower
     * applying priority than `onAccessor`.
     */
    onSetter?: mSetter.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a member method
     * decorator, and provides the callback function for this usage case.
     */
    onMethod?: mMethod.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a member property
     * decorator, and provides the callback function for this usage case.
     */
    onProperty?: mProperty.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a static accessor
     * decorator, and provides the callback function for this usage case.
     *
     * This option has higher applying priority than `onStaticGetter` and
     * `onStaticSetter`.
     */
    onStaticAccessor?: mStaticAccessor.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a static getter
     * decorator, and provides the callback function for this usage case.
     *
     * This option has the same applying priority as `onStaticSetter`, and
     * lower applying priority than `onStaticAccessor`.
     */
    onStaticGetter?: mStaticGetter.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a static setter
     * decorator, and provides the callback function for this usage case.
     *
     * This option has the same applying priority as `onStaticGetter`, and
     * lower applying priority than `onStaticAccessor`.
     */
    onStaticSetter?: mStaticSetter.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a static method
     * decorator, and provides the callback function for this usage case.
     */
    onStaticMethod?: mStaticMethod.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a static property
     * decorator, and provides the callback function for this usage case.
     */
    onStaticProperty?: mStaticProperty.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a method parameter
     * decorator, and provides the callback function for this usage case.
     */
    onMethodParameter?: mMethodParam.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a static method parameter
     * decorator, and provides the callback function for this usage case.
     */
    onStaticMethodParameter?: mStaticMethodParam.IUnifiedFn;

    /**
     * Specifies that the general decorator can be used as a constructor parameter
     * decorator, and provides the callback function for this usage case.
     */
    onConstructorParameter?: mCtorParam.IUnifiedFn;
}
```
