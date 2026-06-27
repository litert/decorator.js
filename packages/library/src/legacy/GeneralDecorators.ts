/**
 * Copyright 2026 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as tC from '@litert/utils-ts-types';
import * as iCompose from '../_internal/Compose.js';
import * as mAccessor from './AccessorDecorators.js';
import * as mClass from './ClassDecorators.js';
import * as mCtorParam from './ConstructorParameterDecorators.js';
import * as mGetter from './GetterDecorators.js';
import * as mMethod from './MethodDecorators.js';
import * as mMethodParam from './MethodParameterDecorators.js';
import * as mProperty from './PropertyDecorators.js';
import * as mSetter from './SetterDecorators.js';
import * as mStaticAccessor from './StaticAccessorDecorators.js';
import * as mStaticGetter from './StaticGetterDecorators.js';
import * as mStaticMethod from './StaticMethodDecorators.js';
import * as mStaticMethodParam from './StaticMethodParameterDecorators.js';
import * as mStaticProperty from './StaticPropertyDecorators.js';
import * as mStaticSetter from './StaticSetterDecorators.js';

/**
 * The callback function signature of legacy general decorators.
 *
 * It accepts class decorators and the non-class decorator forms supported by
 * TypeScript's experimental decorators transform.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    (target: tC.IConstructor): any;

    (target: tC.IObject, propertyKey: undefined | string | symbol, index?: any): any;
}

interface IGeneralDecoratorCase {

    'validate': (args: any[]) => boolean;

    'callback'?: tC.IFunction;

    'call'?: (
        callback: NonNullable<IGeneralDecoratorOptions[keyof IGeneralDecoratorOptions]>,
        args: unknown[],
    ) => any;
}

/**
 * Create a general decorator that applies multiple general decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A general decorator callback.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyGeneralDecorators.compose', decorators);

    const cases: IGeneralDecoratorCase[] = [
        {
            'validate': mClass.validateArgs,
            'callback': mClass.compose(decorators as any),
        },
        {
            'validate': mAccessor.validateArgs,
            'callback': mAccessor.compose(decorators as any),
        },
        {
            'validate': mGetter.validateArgs,
            'callback': mGetter.compose(decorators as any),
        },
        {
            'validate': mSetter.validateArgs,
            'callback': mSetter.compose(decorators as any),
        },
        {
            'validate': mMethod.validateArgs,
            'callback': mMethod.compose(decorators as any),
        },
        {
            'validate': mProperty.validateArgs,
            'callback': mProperty.compose(decorators as any),
        },
        {
            'validate': mStaticAccessor.validateArgs,
            'callback': mStaticAccessor.compose(decorators as any),
        },
        {
            'validate': mStaticGetter.validateArgs,
            'callback': mStaticGetter.compose(decorators as any),
        },
        {
            'validate': mStaticSetter.validateArgs,
            'callback': mStaticSetter.compose(decorators as any),
        },
        {
            'validate': mStaticMethod.validateArgs,
            'callback': mStaticMethod.compose(decorators as any),
        },
        {
            'validate': mStaticProperty.validateArgs,
            'callback': mStaticProperty.compose(decorators as any),
        },
        {
            'validate': mMethodParam.validateArgs,
            'callback': mMethodParam.compose(decorators as any),
        },
        {
            'validate': mStaticMethodParam.validateArgs,
            'callback': mStaticMethodParam.compose(decorators as any),
        },
        {
            'validate': mCtorParam.validateArgs,
            'callback': mCtorParam.compose(decorators as any),
        },
    ];

    return function generalDecorator(...args: any[]): any {

        for (const decoratorCase of cases) {

            if (decoratorCase.validate(args)) {

                return decoratorCase.callback!(...args);
            }
        }

        throw new Error('The decorator can not be used in this way!');
    };
}

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

const TYPES: tC.IDict<IGeneralDecoratorCase, keyof IGeneralDecoratorOptions> = {

    'onClass': {
        'validate': mClass.validateArgs,
        'call': (callback, args) => mClass.callUnifiedDecorator(
            callback as mClass.IUnifiedFn,
            args as Parameters<mClass.ICallbackFn>,
        ),
    },
    'onAccessor': {
        'validate': mAccessor.validateArgs,
        'call': (callback, args) => {

            mAccessor.callUnifiedDecorator(
                callback as mAccessor.IUnifiedFn,
                args as Parameters<mAccessor.ICallbackFn>,
            );
        },
    },
    'onGetter': {
        'validate': mGetter.validateArgs,
        'call': (callback, args) => mGetter.callUnifiedDecorator(
            callback as mGetter.IUnifiedFn,
            args as Parameters<mGetter.ICallbackFn>,
        ),
    },
    'onSetter': {
        'validate': mSetter.validateArgs,
        'call': (callback, args) => mSetter.callUnifiedDecorator(
            callback as mSetter.IUnifiedFn,
            args as Parameters<mSetter.ICallbackFn>,
        ),
    },
    'onMethod': {
        'validate': mMethod.validateArgs,
        'call': (callback, args) => mMethod.callUnifiedDecorator(
            callback as mMethod.IUnifiedFn,
            args as Parameters<mMethod.ICallbackFn>,
        ),
    },
    'onProperty': {
        'validate': mProperty.validateArgs,
        'call': (callback, args) => {

            mProperty.callUnifiedDecorator(
                callback as mProperty.IUnifiedFn,
                args as Parameters<mProperty.ICallbackFn>,
            );
        },
    },
    'onStaticAccessor': {
        'validate': mStaticAccessor.validateArgs,
        'call': (callback, args) => {

            mStaticAccessor.callUnifiedDecorator(
                callback as mStaticAccessor.IUnifiedFn,
                args as Parameters<mStaticAccessor.ICallbackFn>,
            );
        },
    },
    'onStaticGetter': {
        'validate': mStaticGetter.validateArgs,
        'call': (callback, args) => mStaticGetter.callUnifiedDecorator(
            callback as mStaticGetter.IUnifiedFn,
            args as Parameters<mStaticGetter.ICallbackFn>,
        ),
    },
    'onStaticSetter': {
        'validate': mStaticSetter.validateArgs,
        'call': (callback, args) => mStaticSetter.callUnifiedDecorator(
            callback as mStaticSetter.IUnifiedFn,
            args as Parameters<mStaticSetter.ICallbackFn>,
        ),
    },
    'onStaticMethod': {
        'validate': mStaticMethod.validateArgs,
        'call': (callback, args) => mStaticMethod.callUnifiedDecorator(
            callback as mStaticMethod.IUnifiedFn,
            args as Parameters<mStaticMethod.ICallbackFn>,
        ),
    },
    'onStaticProperty': {
        'validate': mStaticProperty.validateArgs,
        'call': (callback, args) => {

            mStaticProperty.callUnifiedDecorator(
                callback as mStaticProperty.IUnifiedFn,
                args as Parameters<mStaticProperty.ICallbackFn>,
            );
        },
    },
    'onMethodParameter': {
        'validate': mMethodParam.validateArgs,
        'call': (callback, args) => {

            mMethodParam.callUnifiedDecorator(
                callback as mMethodParam.IUnifiedFn,
                args as Parameters<mMethodParam.ICallbackFn>,
            );
        },
    },
    'onStaticMethodParameter': {
        'validate': mStaticMethodParam.validateArgs,
        'call': (callback, args) => {

            mStaticMethodParam.callUnifiedDecorator(
                callback as mStaticMethodParam.IUnifiedFn,
                args as Parameters<mStaticMethodParam.ICallbackFn>,
            );
        },
    },
    'onConstructorParameter': {
        'validate': mCtorParam.validateArgs,
        'call': (callback, args) => {

            mCtorParam.callUnifiedDecorator(
                callback as mCtorParam.IUnifiedFn,
                args as Parameters<mCtorParam.ICallbackFn>,
            );
        },
    },
};

/**
 * Create a general decorator function with the specified usage cases.
 *
 * Using this function, you can create a decorator that can be used as the
 * specific decorator type in of the following cases (at least one):
 *
 * - Class decorator
 * - (Static) Accessor decorator
 * - (Static) Getter decorator
 * - (Static) Setter decorator
 * - (Static) Method decorator
 * - (Static) Property decorator
 * - (Static) Method parameter decorator
 * - Constructor parameter decorator
 *
 * For accessor-like decorators, the generated decorator dispatches with this
 * applying priority: accessor > getter == setter. The same priority rule
 * applies to static accessor, static getter, and static setter decorators.
 *
 * @param opts  The options to specify the usage cases of the general decorator.
 * @returns  A general decorator function.
 */
export function create(opts: IGeneralDecoratorOptions): ICallbackFn {

    const cases: Array<keyof IGeneralDecoratorOptions> = [];

    for (const k of [
        'onClass',
        'onAccessor',
        'onGetter',
        'onSetter',
        'onMethod',
        'onProperty',
        'onStaticAccessor',
        'onStaticGetter',
        'onStaticSetter',
        'onStaticMethod',
        'onStaticProperty',
        'onMethodParameter',
        'onStaticMethodParameter',
        'onConstructorParameter',
    ] as const) {

        if (typeof opts[k] === 'function') {

            cases.push(k);
        }
        else if (opts[k] !== undefined) {

            throw new TypeError(`The option "${k}" must be either a function or undefined!`);
        }
    }

    if (!cases.length) {

        throw new TypeError('At least one "on*" option must be provided!');
    }

    return function generalDecorator(...args: any[]): any {

        for (const k of cases) {

            const decoratorCase = TYPES[k];

            if (decoratorCase.validate(args)) {

                return decoratorCase.call!(opts[k]!, args);
            }
        }

        throw new Error('The decorator can not be used in this way!');
    };
}
