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
import * as mAccessors from './AccessorDecorators.js';
import * as mClasses from './ClassDecorators.js';
import * as mGetters from './GetterDecorators.js';
import * as mMethods from './MethodDecorators.js';
import * as mProperties from './PropertyDecorators.js';
import * as mSetters from './SetterDecorators.js';
import * as mStaticAccessors from './StaticAccessorDecorators.js';
import * as mStaticGetters from './StaticGetterDecorators.js';
import * as mStaticMethods from './StaticMethodDecorators.js';
import * as mStaticProperties from './StaticPropertyDecorators.js';
import * as mStaticSetters from './StaticSetterDecorators.js';
import * as LegacyAccessors from '../legacy/AccessorDecorators.js';
import * as LegacyClasses from '../legacy/ClassDecorators.js';
import * as LegacyGetters from '../legacy/GetterDecorators.js';
import * as LegacyMethods from '../legacy/MethodDecorators.js';
import * as LegacyProperties from '../legacy/PropertyDecorators.js';
import * as LegacySetters from '../legacy/SetterDecorators.js';
import * as LegacyStaticAccessors from '../legacy/StaticAccessorDecorators.js';
import * as LegacyStaticGetters from '../legacy/StaticGetterDecorators.js';
import * as LegacyStaticMethods from '../legacy/StaticMethodDecorators.js';
import * as LegacyStaticProperties from '../legacy/StaticPropertyDecorators.js';
import * as LegacyStaticSetters from '../legacy/StaticSetterDecorators.js';
import * as ModernAccessors from '../modern/AccessorDecorators.js';
import * as ModernClasses from '../modern/ClassDecorators.js';
import * as ModernGetters from '../modern/GetterDecorators.js';
import * as ModernMethods from '../modern/MethodDecorators.js';
import * as ModernProperties from '../modern/PropertyDecorators.js';
import * as ModernSetters from '../modern/SetterDecorators.js';
import * as ModernStaticAccessors from '../modern/StaticAccessorDecorators.js';
import * as ModernStaticGetters from '../modern/StaticGetterDecorators.js';
import * as ModernStaticMethods from '../modern/StaticMethodDecorators.js';
import * as ModernStaticProperties from '../modern/StaticPropertyDecorators.js';
import * as ModernStaticSetters from '../modern/StaticSetterDecorators.js';
import * as iLoc from './_internal.js';

/**
 * The options used to create a compatible general decorator.
 */
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

/**
 * The compatible general decorator callback signature.
 *
 * It accepts both class decorators and the non-class decorator forms supported
 * by the configured compatible decorator handlers.
 */
export interface ICallbackFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T,
        ctx?: mClasses.IModernContext<T>
    ): any;

    (...args: any[]): any;
}

interface IGeneralDecoratorCase {

    readonly validate: (args: any[]) => boolean;

    readonly callback?: tC.IFunction;

    readonly create?: (
        opts: NonNullable<ICreateOptions[keyof ICreateOptions]>
    ) => tC.IFunction;
}

/**
 * Create a compatible general decorator that applies multiple general
 * decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A general decorator callback that supports both decorator transforms.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('CompatibleGeneralDecorators.compose', decorators);

    const cases: IGeneralDecoratorCase[] = [
        {
            'validate': (args) => (
                ModernClasses.validateArgs(args) || LegacyClasses.validateArgs(args)
            ),
            'callback': mClasses.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernAccessors.validateArgs(args) || LegacyAccessors.validateArgs(args)
            ),
            'callback': mAccessors.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernGetters.validateArgs(args) || LegacyGetters.validateArgs(args)
            ),
            'callback': mGetters.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernSetters.validateArgs(args) || LegacySetters.validateArgs(args)
            ),
            'callback': mSetters.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernMethods.validateArgs(args) || LegacyMethods.validateArgs(args)
            ),
            'callback': mMethods.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernProperties.validateArgs(args) || LegacyProperties.validateArgs(args)
            ),
            'callback': mProperties.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernStaticAccessors.validateArgs(args)
                || LegacyStaticAccessors.validateArgs(args)
            ),
            'callback': mStaticAccessors.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernStaticGetters.validateArgs(args)
                || LegacyStaticGetters.validateArgs(args)
            ),
            'callback': mStaticGetters.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernStaticSetters.validateArgs(args)
                || LegacyStaticSetters.validateArgs(args)
            ),
            'callback': mStaticSetters.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernStaticMethods.validateArgs(args)
                || LegacyStaticMethods.validateArgs(args)
            ),
            'callback': mStaticMethods.compose(decorators as any),
        },
        {
            'validate': (args) => (
                ModernStaticProperties.validateArgs(args)
                || LegacyStaticProperties.validateArgs(args)
            ),
            'callback': mStaticProperties.compose(decorators as any),
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

const TYPES: tC.IDict<IGeneralDecoratorCase, keyof ICreateOptions> = {

    'onClass': {
        'validate': (args) => (
            ModernClasses.validateArgs(args)
            || LegacyClasses.validateArgs(args)
        ),
        'create': (opts) => mClasses.create(opts as mClasses.ICreateOptions),
    },
    'onAccessor': {
        'validate': (args) => (
            ModernAccessors.validateArgs(args)
            || LegacyAccessors.validateArgs(args)
        ),
        'create': (opts) => mAccessors.create(opts as mAccessors.ICreateOptions),
    },
    'onGetter': {
        'validate': (args) => (
            ModernGetters.validateArgs(args)
            || LegacyGetters.validateArgs(args)
        ),
        'create': (opts) => mGetters.create(opts as mGetters.ICreateOptions),
    },
    'onSetter': {
        'validate': (args) => (
            ModernSetters.validateArgs(args)
            || LegacySetters.validateArgs(args)
        ),
        'create': (opts) => mSetters.create(opts as mSetters.ICreateOptions),
    },
    'onMethod': {
        'validate': (args) => (
            ModernMethods.validateArgs(args)
            || LegacyMethods.validateArgs(args)
        ),
        'create': (opts) => mMethods.create(opts as mMethods.ICreateOptions),
    },
    'onProperty': {
        'validate': (args) => (
            ModernProperties.validateArgs(args)
            || LegacyProperties.validateArgs(args)
        ),
        'create': (opts) => mProperties.create(opts as mProperties.ICreateOptions),
    },
    'onStaticAccessor': {
        'validate': (args) => (
            ModernStaticAccessors.validateArgs(args)
            || LegacyStaticAccessors.validateArgs(args)
        ),
        'create': (opts) => mStaticAccessors.create(
            opts as mStaticAccessors.ICreateOptions,
        ),
    },
    'onStaticGetter': {
        'validate': (args) => (
            ModernStaticGetters.validateArgs(args)
            || LegacyStaticGetters.validateArgs(args)
        ),
        'create': (opts) => mStaticGetters.create(
            opts as mStaticGetters.ICreateOptions,
        ),
    },
    'onStaticSetter': {
        'validate': (args) => (
            ModernStaticSetters.validateArgs(args)
            || LegacyStaticSetters.validateArgs(args)
        ),
        'create': (opts) => mStaticSetters.create(
            opts as mStaticSetters.ICreateOptions,
        ),
    },
    'onStaticMethod': {
        'validate': (args) => (
            ModernStaticMethods.validateArgs(args)
            || LegacyStaticMethods.validateArgs(args)
        ),
        'create': (opts) => mStaticMethods.create(
            opts as mStaticMethods.ICreateOptions,
        ),
    },
    'onStaticProperty': {
        'validate': (args) => (
            ModernStaticProperties.validateArgs(args)
            || LegacyStaticProperties.validateArgs(args)
        ),
        'create': (opts) => mStaticProperties.create(
            opts as mStaticProperties.ICreateOptions,
        ),
    },
};

const ORDERED_CASES: Array<keyof ICreateOptions> = [
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
];

/**
 * Create a compatible general decorator callback.
 *
 * For accessor-like decorators, the generated decorator dispatches with this
 * applying priority: accessor > getter == setter. The same priority rule
 * applies to static accessor, static getter, and static setter decorators.
 *
 * @param opts The supported decorator cases and their compatible implementations.
 * @returns A decorator callback that dispatches by runtime decorator arguments.
 */
export function create(opts: ICreateOptions): ICallbackFn {

    const cases: Array<keyof ICreateOptions> = [];
    const callbacks: Partial<Record<keyof ICreateOptions, tC.IFunction>> = {};

    for (const k of ORDERED_CASES) {

        const caseOptions = opts[k];

        if (caseOptions !== undefined) {

            iLoc.assertCreateOptions(caseOptions);
            cases.push(k);
            callbacks[k] = TYPES[k].create!(caseOptions);
        }
    }

    if (!cases.length) {

        throw new TypeError('At least one "on*" option must be provided!');
    }

    return function generalDecorator(...args: any[]): any {

        for (const k of cases) {

            if (TYPES[k].validate(args)) {

                return callbacks[k]!(...args);
            }
        }

        throw new Error('The decorator can not be used in this way!');
    };
}
