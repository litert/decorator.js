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
import type { IDict } from '@litert/utils-ts-types';
import { isClassPrototype } from './_internal.js';

/**
 * The callback function signature of class member method parameter
 * decorators.
 *
 * @param prototype The prototype of the class being decorated.
 * @param methodName The decorated method name.
 * @param parameterIndex The decorated parameter index.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        methodName: T extends tC.IConstructor ? never : string | symbol,
        parameterIndex: number
    ): void;
}

/**
 * The context object passed to the unified function style method parameter
 * decorator callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.METHOD_PARAMETER;

    /**
     * The prototype of the class that the method parameter decorator is
     * applied to.
     */
    'prototype': tLoc.IPrototype;

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

/**
 * The unified function signature of class member method parameter
 * decorators.
 *
 * @param ctx The context object of the member method parameter decorator.
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

    const prototype = args[0] as tLoc.IPrototype;

    callback({
        'type': cLoc.EContextType.METHOD_PARAMETER,
        'constructor': prototype.constructor,
        'prototype': prototype,
        'methodName': args[1],
        'parameterIndex': args[2],
    });
}

/**
 * Create a decorator that applies multiple method parameter decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyMethodParameterDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a method parameter decorator!');
        }

        iCompose.composeWithoutReplacement(decorators, args);
    };
}

/**
 * Create a method parameter decorator with the given callback function in the
 * unified function style.
 *
 * @param callback  The method parameter decorator callback function in unified
 *                  style.
 * @returns  A new method parameter decorator function with the args check.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a method parameter decorator!');
        }

        callUnifiedDecorator(callback, args);
    };
}

const VALID_NAME_TYPES: IDict<boolean> = {
    string: true,
    symbol: true,
};

/**
 * Check the arguments passed to a decorator function are in the form of member
 * method parameter decorator or not.
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
 *     if (!MethodParameterDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a member method parameter decorator!');
 *     }
 *     const [prototype, methodName, parameterIndex] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return isClassPrototype(args[0])
        && !!VALID_NAME_TYPES[typeof args[1]]
        && Number.isSafeInteger(args[2]);
}

/**
 * Wrap a method parameter decorator callback function. The generated decorator
 * callback checks whether its arguments are in the form of a method parameter
 * decorator, and throws a TypeError when they are not.
 *
 * @param callback  The method parameter decorator callback function to be wrapped.
 * @returns  A new method parameter decorator function with the args check.
 *
 * @example
 * ```ts
 * const myDecorator = MethodParameterDecorators.withArgsCheck((
 *     prototype, methodName, parameterIndex
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

            throw new TypeError('Must be used as a method parameter decorator!');
        }

        callback(...args);
    };
}
