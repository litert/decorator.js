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
 * The callback function signature of class member accessor decorators.
 *
 * @param prototype The prototype of the class being decorated.
 * @param accessorName The decorated accessor name.
 * @param descriptor The accessor descriptor.
 * @throws {TypeError} If a generated callback receives invalid decorator
 *                     arguments.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        accessorName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void;
}

/**
 * The context object passed to the unified function style accessor decorator
 * callback.
 */
export interface IContext extends tLoc.IContextBase {

    /**
     * The normalized decorator type tag.
     */
    'type': cLoc.EContextType.ACCESSOR;

    /**
     * The prototype of the class that the accessor decorator is applied to.
     */
    'prototype': tLoc.IPrototype;

    /**
     * The name of the accessor that the decorator is applied to.
     */
    'accessorName': string | symbol;

    /**
     * The descriptor of the accessor that the decorator is applied to.
     */
    'descriptor': TypedPropertyDescriptor<any>;
}

/**
 * The unified function signature of class member accessor decorators.
 *
 * @param ctx The context object of the member accessor decorator.
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
        'type': cLoc.EContextType.ACCESSOR,
        'constructor': prototype.constructor,
        'prototype': prototype,
        'accessorName': args[1],
        'descriptor': args[2],
    });
}

/**
 * Create a decorator that applies multiple accessor decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 *
 * @warning This is an outdated ECMAScript decorators proposal.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('LegacyAccessorDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as an accessor decorator!');
        }

        iCompose.composeWithoutReplacement(
            decorators,
            args,
        );
    };
}

/**
 * Create a member accessor decorator with the given callback function in the
 * unified function style.
 *
 * @param callback  The member accessor decorator callback in unified style.
 * @returns  A new member accessor decorator function with args check.
 */
export function create(callback: IUnifiedFn): ICallbackFn {

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a member accessor decorator!');
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
 * accessor decorator or not.
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
        && typeof args[2].get === 'function'
        && typeof args[2].set === 'function';
}

/**
 * Wrap a member accessor decorator callback function with args check.
 *
 * @param callback  The member accessor decorator callback function to wrap.
 * @returns  A new member accessor decorator function with args check.
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a member accessor decorator!');
        }

        callback(...args);
    };
}
