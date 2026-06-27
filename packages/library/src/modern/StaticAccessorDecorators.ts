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

import type { IMaybeVoid, IDict } from '@litert/utils-ts-types';
import * as iCompose from '../_internal/Compose.js';

/**
 * The context object passed to the static accessor decorator callback function.
 */
export type IContext<
    TValue = any, TThis = any
> = ClassAccessorDecoratorContext<TThis, TValue> & { static: true; };

/**
 * The callback function signature of static accessor decorators.
 */
export interface ICallbackFn<TValue = any, TThis = any> {

    (
        target: ClassAccessorDecoratorTarget<TThis, TValue>,
        ctx: IContext<TValue, TThis>
    ): IMaybeVoid<ClassAccessorDecoratorResult<TThis, TValue>>;
}

/**
 * Create a decorator that applies multiple static accessor decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('StaticAccessorDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a static accessor decorator!');
        }

        return iCompose.composeAccessorResults(decorators, args);
    };
}

const VALID_NAME_TYPES: IDict<boolean> = {
    string: true,
    symbol: true,
};

/**
 * Check the arguments passed to a decorator function are in the form of static
 * accessor decorator or not.
 *
 * > **Use in the decorator callback functions only.**
 *
 * @param args The arguments passed to the decorator callback.
 *
 * @example
 * ```ts
 * function myDecorator(...args: any[]) {
 *     if (!StaticAccessorDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a static accessor decorator!');
 *     }
 *     const [, ctx] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return typeof args[0] === 'object'
        && args[0] !== null
        && typeof args[0].get === 'function'
        && typeof args[0].set === 'function'
        && typeof args[1] === 'object'
        && args[1] !== null
        && !!VALID_NAME_TYPES[typeof args[1].name]
        && args[1].kind === 'accessor'
        && args[1].static === true;
}

/**
 * Wrap a static accessor decorator callback function with the check of the
 * arguments passed to it are in the form of static accessor decorator or not.
 * If the arguments is not in the form of static accessor decorator, a TypeError
 * will be thrown.
 *
 * @param callback  The static accessor decorator callback function to be wrapped.
 * @returns  A new static accessor decorator function with the args check.
 * @throws {TypeError} If the arguments is invalid.
 *
 * @example
 * ```ts
 * const myDecorator = StaticAccessorDecorators.withArgsCheck((target, ctx) => {
 *     // Do something
 * });
 * ```
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a static accessor decorator!');
        }

        callback(...args);
    };
}
