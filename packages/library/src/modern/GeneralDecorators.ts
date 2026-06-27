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
import * as mGetter from './GetterDecorators.js';
import * as mMethod from './MethodDecorators.js';
import * as mProperty from './PropertyDecorators.js';
import * as mSetter from './SetterDecorators.js';
import * as mStaticAccessor from './StaticAccessorDecorators.js';
import * as mStaticGetter from './StaticGetterDecorators.js';
import * as mStaticMethod from './StaticMethodDecorators.js';
import * as mStaticProperty from './StaticPropertyDecorators.js';
import * as mStaticSetter from './StaticSetterDecorators.js';

/**
 * The callback function signature of modern general decorators.
 *
 * It accepts both class and class-member standard decorator callbacks.
 */
export interface ICallbackFn {

    (value: any, ctx: ClassMemberDecoratorContext): any;

    (ctor: tC.IConstructor, ctx: ClassDecoratorContext): void;
}

/**
 * The context object for the general decorators.
 */
export type IContext = ClassMemberDecoratorContext | ClassDecoratorContext;

interface IGeneralDecoratorCase {

    readonly validate: (args: any[]) => boolean;

    readonly callback: tC.IFunction;
}

/**
 * Create a general decorator that applies multiple general decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A general decorator callback.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('GeneralDecorators.compose', decorators);

    const cases: IGeneralDecoratorCase[] = [
        {
            'validate': mClass.validateArgs,
            'callback': mClass.compose(decorators as any),
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
            'validate': mStaticMethod.validateArgs,
            'callback': mStaticMethod.compose(decorators as any),
        },
        {
            'validate': mStaticProperty.validateArgs,
            'callback': mStaticProperty.compose(decorators as any),
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
    ];

    return function generalDecorator(...args: any[]): any {

        for (const decoratorCase of cases) {

            if (decoratorCase.validate(args)) {

                return decoratorCase.callback(...args);
            }
        }

        throw new Error('The decorator can not be used in this way!');
    };
}

/**
 * The interface of options to specify the usage cases of a general decorator.
 */
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

const TYPES: tC.IDict<((...args: any[]) => boolean), keyof IGeneralDecoratorOptions> = {

    'onClass': mClass.validateArgs,
    'onMethod': mMethod.validateArgs,
    'onProperty': mProperty.validateArgs,
    'onAccessor': mAccessor.validateArgs,
    'onGetter': mGetter.validateArgs,
    'onSetter': mSetter.validateArgs,
    'onStaticMethod': mStaticMethod.validateArgs,
    'onStaticProperty': mStaticProperty.validateArgs,
    'onStaticAccessor': mStaticAccessor.validateArgs,
    'onStaticGetter': mStaticGetter.validateArgs,
    'onStaticSetter': mStaticSetter.validateArgs,
};

/**
 * Create a general decorator function with the specified usage cases.
 *
 * Using this function, you can create a decorator that can be used as the
 * specific decorator type of the following cases (at least one):
 *
 * - Class decorator
 * - (Static) Method decorator
 * - (Static) Property decorator
 * - (Static) Accessor decorator
 * - (Static) Getter decorator
 * - (Static) Setter decorator
 *
 * @param opts  The options to specify the usage cases of the general decorator.
 * @returns  A general decorator function.
 * @throws {TypeError} If no usage case is specified in the options.
 *
 * @example
 * ```ts
 * const myDecorator = createGeneralDecorator({
 *     onClass: (ctor, ctx) => {
 *         // Do something when used as a class decorator
 *     },
 *     onMethod: (method, ctx) => {
 *         // Do something when used as a method decorator
 *     },
 * });
 * ```
 */
export function create(
    opts: IGeneralDecoratorOptions,
): ICallbackFn {

    const cases: Array<keyof IGeneralDecoratorOptions> = [];

    for (const k of [
        'onClass',
        'onMethod',
        'onProperty',
        'onAccessor',
        'onGetter',
        'onSetter',
        'onStaticMethod',
        'onStaticProperty',
        'onStaticAccessor',
        'onStaticGetter',
        'onStaticSetter',
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

            const validate = TYPES[k];

            if (validate(args)) {

                return (opts[k] as tC.IFunction)(...args);
            }
        }

        throw new Error('The decorator can not be used in this way!');
    };
}
