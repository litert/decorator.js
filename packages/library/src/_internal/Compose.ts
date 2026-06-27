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

import type * as tC from '@litert/utils-ts-types';

/**
 * @internal
 */
export interface IAccessorResult {

    get?: tC.IFunction;

    set?: tC.IFunction;

    init?: tC.IFunction;
}

/**
 * @internal
 */
export function assertDecorators(
    apiName: string,
    decorators: readonly tC.IFunction[],
): void {

    if (!Array.isArray(decorators) || decorators.length === 0) {

        throw new TypeError(`${apiName}: The decorators must be a non-empty array!`);
    }

    for (const decorator of decorators) {

        if (typeof decorator !== 'function') {

            throw new TypeError(`${apiName}: The decorators must be functions!`);
        }
    }
}

/**
 * @internal
 */
export function composeWithoutReplacement(
    decorators: readonly tC.IFunction[],
    args: any[],
): void {

    for (const decorator of decorators) {

        decorator(...args);
    }
}

/**
 * @internal
 */
export function composeWithReplacement(
    decorators: readonly tC.IFunction[],
    args: any[],
    replacementIndex: number,
): any {

    let ret: any = undefined;

    for (const decorator of decorators) {

        const currentArgs = [...args];

        if (ret !== undefined) {

            currentArgs[replacementIndex] = ret;
        }

        const nextRet = decorator(...currentArgs);

        if (nextRet !== undefined) {

            ret = nextRet;
        }
    }

    return ret;
}

/**
 * @internal
 */
export function composeFieldInitializers(
    decorators: readonly tC.IFunction[],
    args: any[],
): any {

    const initializers: tC.IFunction[] = [];

    for (const decorator of decorators) {

        const initializer = decorator(...args);

        if (typeof initializer === 'function') {

            initializers.push(initializer as tC.IFunction);
        }
    }

    if (initializers.length === 0) {

        return undefined;
    }

    return function(this: unknown, value: unknown): unknown {

        let currentValue = value;

        for (const initializer of initializers) {

            currentValue = initializer.call(this, currentValue);
        }

        return currentValue;
    };
}

/**
 * @internal
 */
export function composeAccessorResults(
    decorators: readonly tC.IFunction[],
    args: any[],
): any {

    let currentTarget: IAccessorResult = args[0];
    const composedResult: IAccessorResult = {};
    const initializers: tC.IFunction[] = [];

    for (const decorator of decorators) {

        const nextResult = decorator(
            currentTarget,
            args[1],
        );

        if (
            typeof nextResult !== 'object'
            || nextResult === null
        ) {

            continue;
        }

        const accessorResult = nextResult as IAccessorResult;

        if (accessorResult.get !== undefined) {

            composedResult.get = accessorResult.get;
            currentTarget = {
                ...currentTarget,
                'get': accessorResult.get,
            };
        }

        if (accessorResult.set !== undefined) {

            composedResult.set = accessorResult.set;
            currentTarget = {
                ...currentTarget,
                'set': accessorResult.set,
            };
        }

        if (accessorResult.init !== undefined) {

            initializers.push(accessorResult.init);
        }
    }

    if (initializers.length > 0) {

        composedResult.init = function(this: unknown, value: unknown): unknown {

            let currentValue = value;

            for (const initializer of initializers) {

                currentValue = initializer.call(this, currentValue);
            }

            return currentValue;
        };
    }

    return Object.keys(composedResult).length === 0 ? undefined : composedResult;
}
