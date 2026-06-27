# Typings - Compatible.GeneralDecorators

These TypeScript declarations describe the public contracts exported by Compatible.GeneralDecorators.

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';
```

## Interface `ICreateOptions`

The options used to create a compatible general decorator.

Source: [`packages/library/src/compatible/GeneralDecorators.ts#L59`](../../../../../packages/library/src/compatible/GeneralDecorators.ts#L59)

### Definition

```ts
export interface ICreateOptions {

    /**
     * The compatible class decorator handler.
     */
    readonly onClass?: mClasses.ICreateOptions;

    /**
     * The compatible member accessor decorator handler.
     *
     * This option has higher applying priority than `onGetter` and `onSetter`.
     */
    readonly onAccessor?: mAccessors.ICreateOptions;

    /**
     * The compatible member getter decorator handler.
     *
     * This option has the same applying priority as `onSetter`, and lower
     * applying priority than `onAccessor`.
     */
    readonly onGetter?: mGetters.ICreateOptions;

    /**
     * The compatible member setter decorator handler.
     *
     * This option has the same applying priority as `onGetter`, and lower
     * applying priority than `onAccessor`.
     */
    readonly onSetter?: mSetters.ICreateOptions;

    /**
     * The compatible member method decorator handler.
     */
    readonly onMethod?: mMethods.ICreateOptions;

    /**
     * The compatible member property decorator handler.
     */
    readonly onProperty?: mProperties.ICreateOptions;

    /**
     * The compatible static accessor decorator handler.
     *
     * This option has higher applying priority than `onStaticGetter` and
     * `onStaticSetter`.
     */
    readonly onStaticAccessor?: mStaticAccessors.ICreateOptions;

    /**
     * The compatible static getter decorator handler.
     *
     * This option has the same applying priority as `onStaticSetter`, and
     * lower applying priority than `onStaticAccessor`.
     */
    readonly onStaticGetter?: mStaticGetters.ICreateOptions;

    /**
     * The compatible static setter decorator handler.
     *
     * This option has the same applying priority as `onStaticGetter`, and
     * lower applying priority than `onStaticAccessor`.
     */
    readonly onStaticSetter?: mStaticSetters.ICreateOptions;

    /**
     * The compatible static method decorator handler.
     */
    readonly onStaticMethod?: mStaticMethods.ICreateOptions;

    /**
     * The compatible static property decorator handler.
     */
    readonly onStaticProperty?: mStaticProperties.ICreateOptions;
}
```

---

## Interface `ICallbackFn`

The compatible general decorator callback signature.

It accepts both class decorators and the non-class decorator forms supported
by the configured compatible decorator handlers.

Source: [`packages/library/src/compatible/GeneralDecorators.ts#L140`](../../../../../packages/library/src/compatible/GeneralDecorators.ts#L140)

### Definition

```ts
export interface ICallbackFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T,
        ctx?: mClasses.IModernContext<T>
    ): any;

    (...args: any[]): any;
}
```
