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
 * The callback function signature of class member method decorators.
 *
 * @param prototype The prototype of the class being decorated.
 * @param methodName The decorated method name.
 * @param descriptor The method descriptor.
 * @returns The replacement method descriptor, or void.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        methodName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}

/**
 * The context object passed to the unified function style method decorator
 * callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.METHOD;

    /**
     * The prototype of the class that the method decorator is applied to.
     */
    'prototype': tLoc.IPrototype;

    /**
     * The name of the method that the method decorator is applied to. It can
     * be a string or a symbol.
     */
    'methodName': string | symbol;

    /**
     * The descriptor of the method that the method decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}

/**
 * The unified function signature of class member method decorators.
 *
 * @param ctx The context object of the member method decorator.
 * @returns The replacement method descriptor, or void.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface IUnifiedFn {

    (ctx: IContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}

/**
 * @internal
 */
export function callUnifiedDecorator(
    callback: IUnifiedFn,
    args: Parameters<ICallbackFn>,
): tC.IMaybeVoid<TypedPropertyDescriptor<any>> {

    const prototype = args[0] as tLoc.IPrototype;

    return callback({
        'type': cLoc.EContextType.METHOD,
        'constructor': prototype.constructor,
        'prototype': prototype,
        'methodName': args[1],
        'descriptor': args[2],
    });
}

/**
 * Create a decorator that applies multiple method decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyMethodDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a method decorator!');
        }

        return iCompose.composeWithReplacement(
            decorators,
            args,
            2,
        );
    };
}

/**
 * Create a method decorator, with the given callback function in the unified
 * function style. The callback function will be called with a context object
 * when the method decorator is applied to a class member method. The context
 * object contains the constructor, prototype, method name, and descriptor of
 * the class member method.
 *
 * @param callback  The method decorator callback function in the unified style.
 * @returns  A new method decorator function with the args check.
 *
 * @example
 * ```ts
 * const myDecorator = MethodDecorators.create((ctx) => {
 *     // Do something
 * });
 * ```
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a method decorator!');
        }

        return callUnifiedDecorator(callback, args);
    };
}

const VALID_NAME_TYPES: IDict<boolean> = {
    string: true,
    symbol: true,
};

/**
 * Check the arguments passed to a decorator function are in the form of member
 * method decorator or not.
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
 *     if (!MethodDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a member method decorator!');
 *     }
 *     const [prototype, methodName, descriptor] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return isClassPrototype(args[0])
        && !!VALID_NAME_TYPES[typeof args[1]]
        && typeof args[2] === 'object'
        && args[2] !== null
        && typeof args[2].value === 'function';
}

/**
 * Wrap a method decorator callback function. The generated decorator callback
 * checks whether its arguments are in the form of a method decorator, and
 * throws a TypeError when they are not.
 *
 * @param callback  The method decorator callback function to be wrapped.
 * @returns  A new method decorator function with the args check.
 *
 * @example
 * ```ts
 * const myDecorator = MethodDecorators.withArgsCheck((
 *     prototype, methodName, descriptor
 * ) => {
 *     // Do something
 * });
 * ```
 */
export function withArgsCheck(callback: ICallbackFn): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a method decorator!');
        }

        callback(...args);
    };
}
