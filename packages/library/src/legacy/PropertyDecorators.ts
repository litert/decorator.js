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

import type * as tLoc from './Typings.js';
import * as cLoc from './Constants.js';
import * as iCompose from '../_internal/Compose.js';
import type { IDict } from '@litert/utils-ts-types';
import { isClassPrototype } from './_internal.js';

/**
 * The callback function signature of class member property decorators.
 *
 * @param prototype The prototype of the class being decorated.
 * @param propKey The decorated property key.
 * @param dtr The reserved descriptor placeholder.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        propKey: string | symbol,
        dtr?: undefined
    ): void;
}

/**
 * The context object passed to the unified function style property decorator
 * callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.PROPERTY;

    /**
     * The prototype of the class that the property decorator is applied to.
     */
    'prototype': tLoc.IPrototype;

    /**
     * The name of the property that the property decorator is applied to.
     */
    'propertyName': string | symbol;
}

/**
 * The unified function signature of class member property decorators.
 *
 * @param ctx The context object of the member property decorator.
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
        'type': cLoc.EContextType.PROPERTY,
        'constructor': prototype.constructor,
        'prototype': prototype,
        'propertyName': args[1],
    });
}

/**
 * Create a decorator that applies multiple property decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyPropertyDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a property decorator!');
        }

        iCompose.composeWithoutReplacement(decorators, args);
    };
}

/**
 * Create a property decorator with the given callback function in the unified
 * function style.
 *
 * @param callback  The property decorator callback function in unified style.
 * @returns  A new property decorator function with the args check.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a property decorator!');
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
 * property decorator or not.
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
 *     if (!PropertyDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a member property decorator!');
 *     }
 *     const [proto, key] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return isClassPrototype(args[0])
        && !!VALID_NAME_TYPES[typeof args[1]]
        && args[2] === undefined;
}

/**
 * Wrap a property decorator callback function. The generated decorator
 * callback checks whether its arguments are in the form of a property
 * decorator, and throws a TypeError when they are not.
 *
 * @param callback  The property decorator callback function to be wrapped.
 * @returns  A new property decorator function with the args check.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 *
 * @example
 * ```ts
 * const myDecorator = PropertyDecorators.withArgsCheck((classPrototype, propName) => {
 *     // Do something
 * });
 * ```
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a property decorator!');
        }

        callback(...args);
    };
}
