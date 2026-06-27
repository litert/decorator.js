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
import { isClassConstructor } from '@litert/utils-object';

/**
 * The context object passed to the class decorator callback function.
 */
export type IContext<
    T extends tC.IConstructor = tC.IConstructor
> = ClassDecoratorContext<T>;

/**
 * The callback function signature of class decorators.
 */
export interface ICallbackFn<T extends tC.IConstructor = tC.IConstructor> {

    (ctor: T, ctx: IContext<T>): void;
}

/**
 * Create a decorator that applies multiple class decorators in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A new decorator callback that applies the given decorators.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('ClassDecorators.compose', decorators);

    return function(...args) {

        if (!validateArgs(args)) {

            throw new TypeError('Must be used as a class decorator!');
        }

        return iCompose.composeWithReplacement(decorators, args, 0);
    };
}

/**
 * Check the arguments passed to a decorator function are in the form of class
 * decorator or not.
 *
 * > **Use in the decorator callback functions only.**
 *
 * @param args The arguments passed to the decorator callback.
 *
 * @example
 * ```ts
 * function myDecorator(...args: any[]) {
 *     if (!ClassDecorators.validateArgs(args)) {
 *        throw new Error('Must be used as a class decorator!');
 *     }
 *     const [classCtor, ctx] = args;
 *     // Do something
 * }
 * ```
 */
export function validateArgs(
    args: any[],
): args is Parameters<ICallbackFn> {

    return isClassConstructor(args[0])
        && typeof args[1] === 'object'
        && args[1] !== null
        && args[1].kind === 'class';
}

/**
 * Wrap a class decorator callback function with the check of the arguments
 * passed to it are in the form of class decorator or not. If the arguments
 * is not in the form of class decorator, a TypeError will be thrown.
 *
 * @param callback  The class decorator callback function to be wrapped.
 * @returns  A new class decorator function with the args check.
 * @throws {TypeError} If the arguments is invalid.
 *
 * @example
 * ```ts
 * const myDecorator = ClassDecorators.withArgsCheck((ctor, ctx) => {
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
