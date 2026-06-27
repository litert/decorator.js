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
import * as Legacy from '../legacy/AccessorDecorators.js';
import * as Modern from '../modern/AccessorDecorators.js';
import * as iLoc from './_internal.js';

/**
 * The normalized legacy member accessor decorator context.
 */
export type ILegacyContext = Legacy.IContext;

/**
 * The locally declared modern member accessor decorator context shape.
 */
export type IModernContext<
    TValue = any,
    TThis = any
> = tLoc.IModernAccessorContext<false> & {

    /**
     * Access helpers provided by the standard decorator context.
     */
    readonly access?: {
        /**
         * Read the decorated value from an instance.
         */
        get?(object: TThis): TValue;

        /**
         * Write the decorated value on an instance.
         */
        set?(object: TThis, value: TValue): void;

        /**
         * Check whether an instance has the decorated value.
         */
        has?(object: TThis): boolean;
    };
};

/**
 * The compatible legacy implementation for an member accessor decorator.
 */
export interface ILegacyFn {

    (ctx: ILegacyContext): void;
}

/**
 * The compatible modern implementation for an member accessor decorator.
 */
export interface IModernFn<
    TValue = any,
    TThis = any
> {

    (
        accessor: tLoc.IModernAccessorTarget<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tLoc.IModernAccessorResult<TValue, TThis>>;
}

/**
 * The options used to create a compatible member accessor decorator.
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
 * The compatible member accessor decorator callback signature.
 */
export interface ICallbackFn {

    <T>(
        prototype: T,
        accessorName: T extends tC.IConstructor ? never : string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): void;

    <TValue = any, TThis = any>(
        accessor: tLoc.IModernAccessorTarget<TValue, TThis>,
        ctx: IModernContext<TValue, TThis>
    ): tC.IMaybeVoid<tLoc.IModernAccessorResult<TValue, TThis>>;
}

/**
 * Create a compatible decorator that applies multiple accessor decorators
 * in order.
 *
 * @param decorators The decorators to be applied.
 * @returns A decorator callback that supports both legacy and modern transforms.
 * @throws {TypeError} If the decorators list is empty or contains non-functions.
 */
export function compose(decorators: readonly ICallbackFn[]): ICallbackFn {

    iCompose.assertDecorators('CompatibleAccessorDecorators.compose', decorators);

    return function(...args: any[]): any {

        if (Modern.validateArgs(args)) {

            return iCompose.composeAccessorResults(decorators, args);
        }

        if (Legacy.validateArgs(args)) {

            iCompose.composeWithoutReplacement(decorators, args);
            return;
        }

        throw new TypeError('Must be used as an accessor decorator!');
    };
}

/**
 * Create a member accessor decorator callback that supports both legacy and
 * modern TypeScript decorator transforms.
 *
 * @param opts The legacy and modern implementations of the accessor decorator.
 * @returns An accessor decorator callback that dispatches by runtime arguments.
 */
export function create(opts: ICreateOptions): ICallbackFn {

    iLoc.assertCreateOptions(opts);

    return function(...args: any[]): any {

        if (Modern.validateArgs(args)) {

            return opts.modern(args[0], args[1] as IModernContext);
        }

        if (Legacy.validateArgs(args)) {

            Legacy.callUnifiedDecorator(
                opts.legacy,
                args,
            );

            return;
        }

        throw new TypeError('Must be used as a member accessor decorator!');
    };
}
