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

import type * as tC from '@litert/utils-ts-types';

/**
 * @internal
 */
export interface ICreateOptionsBase {

    readonly legacy: tC.IFunction;

    readonly modern: tC.IFunction;
}

/**
 * Validate the options for creating a compatible decorator.
 *
 * @internal
 */
export function assertCreateOptions(opts: ICreateOptionsBase): void {

    if (typeof opts.legacy !== 'function') {

        throw new TypeError('The option "legacy" must be a function!');
    }

    if (typeof opts.modern !== 'function') {

        throw new TypeError('The option "modern" must be a function!');
    }
}
