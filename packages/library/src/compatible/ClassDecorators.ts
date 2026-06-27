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
/* eslint-disable @typescript-eslint/prefer-function-type */

import type * as tC from '@litert/utils-ts-types';
import * as iCompose from '../_internal/Compose.js';
import * as Legacy from '../legacy/ClassDecorators.js';
import * as Modern from '../modern/ClassDecorators.js';
import * as iLoc from './_internal.js';

/**
 * The legacy class decorator context passed to the compatible legacy callback.
 */
export interface ILegacyContext<
    T extends tC.IConstructor = tC.IConstructor
> {

    /**
     * The type of the decorator.
     */
    'type': 'class';

    /**
     * The constructor of the class that the decorator is applied to.
     */
    'constructor': T;
}

/**
 * Minimal modern class decorator context shape.
 *
 * This type is declared locally so the compatible entrypoint does not depend on
 * TypeScript's built-in decorator lib declarations being available to users.
 */
export interface IModernContext<
    T extends tC.IConstructor = tC.IConstructor
> {

    /**
     * The kind of decorator context.
     */
    'kind': 'class';

    /**
     * The class name reported by the standard decorator context.
     */
    'name'?: string;

    /**
     * Register an initializer to run after class definition evaluation.
     */
    'addInitializer'?: (initializer: (this: T) => void) => void;

    /**
     * Metadata storage provided by TypeScript's standard decorators transform.
     */
    'metadata'?: Record<PropertyKey, unknown>;
}

/**
 * The compatible legacy class decorator implementation.
 *
 * @param ctx The normalized legacy class decorator context.
 * @returns The replacement constructor, or void.
 */
export interface ILegacyFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctx: ILegacyContext<T>
    ): tC.IMaybeVoid<T>;
}

/**
 * The compatible modern class decorator implementation.
 *
 * @param ctor The constructor of the class being decorated.
 * @param ctx The modern class decorator context.
 * @returns The replacement constructor, or void.
 */
export interface IModernFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T,
        ctx: IModernContext<T>
    ): tC.IMaybeVoid<T>;
}

/**
 * The options used to create a compatible class decorator.
 */
export interface ICreateOptions {

    /**
     * The implementation used by legacy ECMAScript decorators.
     */
    'legacy': ILegacyFn;

    /**
     * The implementation used by modern ECMAScript decorators.
     */
    'modern': IModernFn;
}

/**
 * The compatible class decorator callback signature.
 *
 * @param ctor The constructor of the class being decorated.
 * @param ctx The modern class decorator context, if standard decorators
 *            are used.
 * @returns The replacement constructor, or void.
 */
export interface ICallbackFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T,
        ctx?: IModernContext<T>
    ): tC.IMaybeVoid<T>;
}

/**
 * Create a compatible decorator that applies multiple class decorators
 * in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A decorator callback that supports both legacy and modern transforms.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('CompatibleClassDecorators.compose', decorators);

    return function(...args: any[]): any {

        if (Modern.validateArgs(args)) {

            return iCompose.composeWithReplacement(decorators, args, 0);
        }

        if (Legacy.validateArgs(args)) {

            return iCompose.composeWithReplacement(decorators, args, 0);
        }

        throw new TypeError('Must be used as a class decorator!');
    };
}

/**
 * Create a class decorator callback that supports both legacy and modern
 * TypeScript decorator transforms.
 *
 * @param opts The legacy and modern implementations of the class decorator.
 * @returns A class decorator callback that dispatches by runtime arguments.
 *
 * @example
 * ```ts
 * const decorator = ClassDecorators.create({
 *     legacy: (ctx) => {
 *         // Legacy TypeScript decorator implementation.
 *     },
 *     modern: (ctor, ctx) => {
 *         // Modern TypeScript decorator implementation.
 *     },
 * });
 * ```
 */
export function create(opts: ICreateOptions): ICallbackFn {

    iLoc.assertCreateOptions(opts);

    return function(...args: any[]): any {

        if (Modern.validateArgs(args)) {

            return opts.modern(args[0], args[1]);
        }

        if (Legacy.validateArgs(args)) {

            return Legacy.callUnifiedDecorator(opts.legacy, args);
        }

        throw new TypeError('Must be used as a class decorator!');
    };
}
