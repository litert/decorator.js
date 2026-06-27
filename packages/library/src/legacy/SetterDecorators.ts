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
 * The callback function signature of class member setter decorators.
 *
 * @param prototype The prototype of the class being decorated.
 * @param setterName The decorated setter name.
 * @param descriptor The setter descriptor.
 * @returns The replacement setter descriptor, or void.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        setterName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}

/**
 * The context object passed to the unified function style setter decorator
 * callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.SETTER;

    /**
     * The prototype of the class that the setter decorator is applied to.
     */
    'prototype': tLoc.IPrototype;

    /**
     * The name of the setter that the decorator is applied to.
     */
    'setterName': string | symbol;

    /**
     * The descriptor of the setter that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}

/**
 * The unified function signature of class member setter decorators.
 *
 * @param ctx The context object of the member setter decorator.
 * @returns The replacement setter descriptor, or void.
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
        'type': cLoc.EContextType.SETTER,
        'constructor': prototype.constructor,
        'prototype': prototype,
        'setterName': args[1],
        'descriptor': args[2],
    });
}

/**
 * Create a decorator that applies multiple setter decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacySetterDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a setter decorator!');
        }

        return iCompose.composeWithReplacement(
            decorators,
            args,
            2,
        );
    };
}

/**
 * Create a member setter decorator with the given callback function in the
 * unified function style.
 *
 * @param callback  The member setter decorator callback in unified style.
 * @returns  A new member setter decorator function with args check.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a member setter decorator!');
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
 * setter decorator or not.
 *
 * > **Use in the decorator callback functions only.**
 *
 * @param args The arguments passed to the decorator callback.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return isClassPrototype(args[0])
        && !!VALID_NAME_TYPES[typeof args[1]]
        && typeof args[2] === 'object'
        && args[2] !== null
        && typeof args[2].set === 'function';
}

/**
 * Wrap a member setter decorator callback function with args check.
 *
 * @param callback  The member setter decorator callback function to wrap.
 * @returns  A new member setter decorator function with args check.
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a member setter decorator!');
        }

        callback(...args);
    };
}
