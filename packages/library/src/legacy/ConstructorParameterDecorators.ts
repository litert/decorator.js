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
import type * as tLoc from './Typings.js';
import * as cLoc from './Constants.js';
import * as iCompose from '../_internal/Compose.js';
import { isClassConstructor } from '@litert/utils-object';

/**
 * The callback function signature of class constructor parameter
 * decorators.
 *
 * @param classCtor The constructor of the class being decorated.
 * @param _reserved The reserved property key placeholder.
 * @param parameterIndex The decorated parameter index.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        _reserved: undefined,
        parameterIndex: number
    ): void;
}

/**
 * The context object passed to the unified function style constructor parameter
 * decorator callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.CONSTRUCTOR_PARAMETER;

    /**
     * The index of the parameter in the constructor parameter list. The index
     * is zero-based.
     */
    'parameterIndex': number;
}

/**
 * The unified function signature of class constructor parameter decorators.
 *
 * @param ctx The context object of the constructor parameter decorator.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface IUnifiedFn {

    (ctx: IContext): void;
}

/**
 * @internal
 */
export function callUnifiedDecorator(
    callback: IUnifiedFn,
    args: Parameters<ICallbackFn>,
): void {

    callback({
        'type': cLoc.EContextType.CONSTRUCTOR_PARAMETER,
        'constructor': args[0],
        'parameterIndex': args[2],
    });
}

/**
 * Create a decorator that applies multiple constructor parameter decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyConstructorParameterDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a constructor parameter decorator!');
        }

        iCompose.composeWithoutReplacement(decorators, args);
    };
}

/**
 * Create a constructor parameter decorator with the given callback function in
 * the unified function style.
 *
 * @param callback  The constructor parameter decorator callback function in
 *                  unified style.
 * @returns  A new constructor parameter decorator function with the args check.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a constructor parameter decorator!');
        }

        callUnifiedDecorator(callback, args);
    };
}

/**
 * Check the arguments passed to a decorator function are in the form of class
 * constructor parameter decorator or not.
 *
 * > **Use in the decorator callback functions only.**
 *
 * @param args The arguments passed to the decorator callback.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 *
 * @example
 * ```ts
 * function myDecorator(...args: any[]) {
 *     if (!ConstructorParameterDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a constructor parameter decorator!');
 *     }
 *     const [classCtor, _reserved, parameterIndex] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return isClassConstructor(args[0])
        && args[1] === undefined
        && Number.isSafeInteger(args[2]);
}

/**
 * Wrap a constructor parameter decorator callback function. The generated
 * decorator callback checks whether its arguments are in the form of a
 * constructor parameter decorator, and throws a TypeError when they are not.
 *
 * @param callback  The constructor parameter decorator callback function to
 *                  be wrapped.
 * @returns  A new constructor parameter decorator function with the
 *           argument check.
 *
 * @example
 * ```ts
 * const myDecorator = ConstructorParameterDecorators.withArgsCheck((
 *     classCtor, _reserved, parameterIndex
 * ) => {
 *     // Do something
 * });
 * ```
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a constructor parameter decorator!');
        }

        callback(...args);
    };
}
