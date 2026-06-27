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
 * The callback function signature of class member getter decorators.
 *
 * @param prototype The prototype of the class being decorated.
 * @param getterName The decorated getter name.
 * @param descriptor The getter descriptor.
 * @returns The replacement getter descriptor, or void.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        getterName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}

/**
 * The context object passed to the unified function style getter decorator
 * callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.GETTER;

    /**
     * The prototype of the class that the getter decorator is applied to.
     */
    'prototype': tLoc.IPrototype;

    /**
     * The name of the getter that the decorator is applied to.
     */
    'getterName': string | symbol;

    /**
     * The descriptor of the getter that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}

/**
 * The unified function signature of class member getter decorators.
 *
 * @param ctx The context object of the member getter decorator.
 * @returns The replacement getter descriptor, or void.
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
        'type': cLoc.EContextType.GETTER,
        'constructor': prototype.constructor,
        'prototype': prototype,
        'getterName': args[1],
        'descriptor': args[2],
    });
}

/**
 * Create a decorator that applies multiple getter decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyGetterDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a getter decorator!');
        }

        return iCompose.composeWithReplacement(
            decorators,
            args,
            2,
        );
    };
}

/**
 * Create a member getter decorator with the given callback function in the
 * unified function style.
 *
 * @param callback  The member getter decorator callback in unified style.
 * @returns  A new member getter decorator function with args check.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a member getter decorator!');
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
 * getter decorator or not.
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
        && typeof args[2].get === 'function';
}

/**
 * Wrap a member getter decorator callback function with args check.
 *
 * @param callback  The member getter decorator callback function to wrap.
 * @returns  A new member getter decorator function with args check.
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a member getter decorator!');
        }

        callback(...args);
    };
}
