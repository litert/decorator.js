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
import type { IDict } from '@litert/utils-ts-types';

/**
 * The context object passed to the static method decorator callback function.
 */
export type IContext<
    TFn extends tC.IFunction = tC.IFunction,
> = ClassMethodDecoratorContext<tC.IObject, TFn> & { static: true; };

/**
 * The callback function signature of static method decorators.
 */
export interface ICallbackFn<
    T extends (...args: any[]) => any = (...args: any[]) => any
> {

    (method: T, ctx: IContext<T>): tC.IMaybeVoid<T>;
}

/**
 * Create a decorator that applies multiple static method decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('StaticMethodDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a static method decorator!');
        }

        return iCompose.composeWithReplacement(decorators, args, 0);
    };
}

const VALID_NAME_TYPES: IDict<boolean> = {
    string: true,
    symbol: true,
};

/**
 * Check the arguments passed to a decorator function are in the form of static
 * method decorator or not.
 *
 * > **Use in the decorator callback functions only.**
 *
 * @param args The arguments passed to the decorator callback.
 *
 * @example
 * ```ts
 * function myDecorator(...args: any[]) {
 *     if (!StaticMethodDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a static method decorator!');
 *     }
 *     const [, ctx] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return typeof args[0] === 'function'
        && typeof args[1] === 'object'
        && args[1] !== null
        && !!VALID_NAME_TYPES[typeof args[1].name]
        && args[1].kind === 'method'
        && args[1].static === true;
}

/**
 * Wrap a static method decorator callback function with the check of the
 * arguments passed to it are in the form of static method decorator or not.
 * If the arguments is not in the form of static method decorator, a TypeError
 * will be thrown.
 *
 * @param callback  The static method decorator callback function to be wrapped.
 * @returns  A new static method decorator function with the args check.
 * @throws {TypeError} If the arguments is invalid.
 *
 * @example
 * ```ts
 * const myDecorator = StaticMethodDecorators.withArgsCheck((method, ctx) => {
 *     // Do something
 * });
 * ```
 */
export function withArgsCheck(
    callback: ICallbackFn,
): ICallbackFn {

    return function(...args): void {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a static method decorator!');
        }

        callback(...args);
    };
}
