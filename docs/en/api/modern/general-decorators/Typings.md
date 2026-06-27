# Typings - Modern.GeneralDecorators

These TypeScript declarations describe the public contracts exported by Modern.GeneralDecorators.

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator';
import { GeneralDecorators as GeneralDecoratorsFromModern } from '@litert/decorator/modern';
```

## Interface `ICallbackFn`

The callback function signature of modern general decorators.

It accepts both class and class-member standard decorator callbacks.

Source: [`packages/library/src/modern/GeneralDecorators.ts#L38`](../../../../../packages/library/src/modern/GeneralDecorators.ts#L38)

### Definition

```ts
export interface ICallbackFn {

    (value: any, ctx: ClassMemberDecoratorContext): any;

    (ctor: tC.IConstructor, ctx: ClassDecoratorContext): void;
}
```

---

## Type Alias `IContext`

The context object for the general decorators.

Source: [`packages/library/src/modern/GeneralDecorators.ts#L48`](../../../../../packages/library/src/modern/GeneralDecorators.ts#L48)

### Definition

```ts
export type IContext = ClassMemberDecoratorContext | ClassDecoratorContext;
```

---

## Interface `IGeneralDecoratorOptions`

The interface of options to specify the usage cases of a general decorator.

Source: [`packages/library/src/modern/GeneralDecorators.ts#L132`](../../../../../packages/library/src/modern/GeneralDecorators.ts#L132)

### Definition

```ts
export interface IGeneralDecoratorOptions {

    /**
     * Specifies that the general decorator can be used as a member getter
     * decorator, and provides the callback function for this usage case.
     */
    'onGetter'?: mGetter.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a member setter
     * decorator, and provides the callback function for this usage case.
     */
    'onSetter'?: mSetter.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a member accessor
     * decorator, and provides the callback function for this usage case.
     */
    'onAccessor'?: mAccessor.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a member property
     * decorator, and provides the callback function for this usage case.
     */
    'onProperty'?: mProperty.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a member method
     * decorator, and provides the callback function for this usage case.
     */
    'onMethod'?: mMethod.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a class decorator,
     * and provides the callback function for this usage case.
     */
    'onClass'?: mClass.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a static method
     * decorator, and provides the callback function for this usage case.
     */
    'onStaticMethod'?: mStaticMethod.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a static property
     * decorator, and provides the callback function for this usage case.
     */
    'onStaticProperty'?: mStaticProperty.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a static accessor
     * decorator, and provides the callback function for this usage case.
     */
    'onStaticAccessor'?: mStaticAccessor.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a static getter
     * decorator, and provides the callback function for this usage case.
     */
    'onStaticGetter'?: mStaticGetter.ICallbackFn;

    /**
     * Specifies that the general decorator can be used as a static setter
     * decorator, and provides the callback function for this usage case.
     */
    'onStaticSetter'?: mStaticSetter.ICallbackFn;
}
```
