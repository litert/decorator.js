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
import * as iCompose from '../_internal/Compose.js';
import * as Legacy from '../legacy/StaticGetterDecorators.js';
import * as Modern from '../modern/StaticGetterDecorators.js';
import * as iLoc from './_internal.js';

/**
 * The normalized legacy static getter decorator context.
 */
export type ILegacyContext = Legacy.IContext;

/**
 * The static getter function value handled by a modern decorator.
 */
export type IGetterFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = (this: TThis) => TValue;

/**
 * The locally declared modern static getter decorator context shape.
 */
export type IModernContext<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> = tLoc.IModernGetterContext<true> & {

    /**
     * Access helpers provided by the standard decorator context.
     */
    readonly access?: {
        /**
         * Read the decorated value from an instance.
         */
        get?(object: TThis): TValue;
    };
};

/**
 * @param ctx The legacy context object for static getter decorators.
 */
export interface ILegacyFn {

    (ctx: ILegacyContext): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;
}

/**
 * The compatible modern implementation for a static getter decorator.
 */
export interface IModernFn<
    TValue = any,
    TThis extends tC.IConstructor = tC.IConstructor
> {

    (
        getter: IGetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<IGetterFn<TValue, TThis>>;
}

/**
 * The options used to create a compatible static getter decorator.
 */
export interface ICreateOptions {

    /**
     * The implementation used by legacy ECMAScript decorators.
     */
    readonly legacy: ILegacyFn;

    /**
     * The implementation used by modern ECMAScript decorators.
     */
    readonly modern: IModernFn;
}

/**
 * The compatible static getter decorator callback signature.
 */
export interface ICallbackFn {

    (
        classCtor: tC.IConstructor,
        getterName: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): tC.IMaybeVoid<TypedPropertyDescriptor<any>>;

    <TValue = any, TThis extends tC.IConstructor = tC.IConstructor>(
        getter: IGetterFn<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<IGetterFn<TValue, TThis>>;
}

/**
 * Create a compatible decorator that applies multiple static getter decorators
 * in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A decorator callback that supports both legacy and modern transforms.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('CompatibleStaticGetterDecorators.compose', decorators);

    return function(...args: any[]): any {

        if (Modern.validateArgs(args)) {

            return iCompose.composeWithReplacement(decorators, args, 0);
        }

        if (Legacy.validateArgs(args)) {

            return iCompose.composeWithReplacement(decorators, args, 2);
        }

        throw new TypeError('Must be used as a static getter decorator!');
    };
}

/**
 * Create a static getter decorator callback that supports both legacy and
 * modern TypeScript decorator transforms.
 *
 * @param opts The legacy and modern implementations of the static getter decorator.
 * @returns A static getter decorator callback that dispatches by runtime arguments.
 */
export function create(opts: ICreateOptions): ICallbackFn {

    iLoc.assertCreateOptions(opts);

    return function(...args: any[]): any {

        if (Modern.validateArgs(args)) {

            return opts.modern(args[0], args[1] as IModernContext);
        }

        if (Legacy.validateArgs(args)) {

            return Legacy.callUnifiedDecorator(
                opts.legacy,
                args,
            );
        }

        throw new TypeError('Must be used as a static getter decorator!');
    };
}
