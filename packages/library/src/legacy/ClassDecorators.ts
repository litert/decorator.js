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

/* eslint-disable @typescript-eslint/prefer-function-type */

import type * as tC from '@litert/utils-ts-types';
import type * as tLoc from './Typings.js';
import * as cLoc from './Constants.js';
import * as iCompose from '../_internal/Compose.js';
import { isClassConstructor } from '@litert/utils-object';

/**
 * The callback function signature of class decorators.
 *
 * @param ctor The constructor of the class being decorated.
 * @returns The replacement constructor, or void.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctor: T
    ): tC.IMaybeVoid<T>;
}

/**
 * The context object passed to the unified function style class decorator
 * callback.
 */
export interface IContext<
    T extends tC.IConstructor = tC.IConstructor
> extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.CLASS;

    /**
     * The constructor of the class that the decorator is applied to.
     */
    'constructor': T;
}

/**
 * The unified function signature of class decorators.
 *
 * @param ctx The context object of the class decorator.
 * @returns The replacement constructor, or void.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface IUnifiedFn {

    <T extends tC.IConstructor = tC.IConstructor>(
        ctx: IContext<T>
    ): tC.IMaybeVoid<T>;
}

/**
 * @internal
 */
export function callUnifiedDecorator<
    T extends tC.IConstructor = tC.IConstructor
>(
    callback: IUnifiedFn,
    args: [ctor: T],
): tC.IMaybeVoid<T> {

    return callback({
        'type': cLoc.EContextType.CLASS,
        'constructor': args[0],
    });
}

/**
 * Create a decorator that applies multiple class decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyClassDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a class decorator!');
        }

        return iCompose.composeWithReplacement(
            decorators,
            args,
            0,
        );
    };
}

/**
 * Create a class decorator with the given callback function in the unified
 * function style.
 *
 * @param callback  The class decorator callback function in unified style.
 * @returns  A new class decorator function with the args check.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function<T extends tC.IConstructor = tC.IConstructor>(
        ctor: T
    ): tC.IMaybeVoid<T> {

        const args: [T] = [ctor];

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a class decorator!');
        }

        return callUnifiedDecorator(callback, args);
    };
}

/**
 * Check the arguments passed to a decorator function are in the form of class
 * decorator or not.
 *
 * > **Use in the decorator callback functions only.**
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 *
 * @param args The arguments passed to the decorator callback.
 *
 * @example
 * ```ts
 * function myDecorator(...args: any[]) {
 *     if (!validateArgs(args)) {
 *        throw new Error('Must be used as a class decorator!');
 *     }
 *     const [classCtor] = args;
 *     // Do something with the target class constructor
 * }
 * ```
 */
export function validateArgs(
    args: unknown[],
): args is Parameters<ICallbackFn> {

    return isClassConstructor(args[0])
        && args[1] === undefined
        && args[2] === undefined;
}

/**
 * Wrap a class decorator callback function. The generated decorator callback
 * checks whether its arguments are in the form of a class decorator, and
 * throws a TypeError when they are not.
 *
 * @param callback  The class decorator callback function to be wrapped.
 * @returns  A new class decorator function with the args check.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 *
 * @example
 * ```ts
 * const myDecorator = ClassDecorators.withArgsCheck((ctor) => {
 *     // Do something
 * });
 * ```
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a class decorator!');
        }

        callback(...args);
    };
}
