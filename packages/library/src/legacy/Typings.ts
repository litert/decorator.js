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

import type { IConstructor } from '@litert/utils-ts-types';
import type { EContextType } from './Constants.js';
/**
 * Constructor helper types re-exported for legacy decorator contexts.
 */
export type { IConstructor, IInstanceOf } from '@litert/utils-ts-types';

/**
 * The `prototype` object type of a class constructor.
 */
export interface IPrototype<T extends IConstructor = IConstructor> extends Record<string, any> {

    /**
     * The constructor that owns the prototype object.
     */
    constructor: T;
}

/**
 * The common context fields shared by all unified legacy decorator callbacks.
 */
export interface IContextBase {

    /**
     * The type of the decorator.
     */
    'type': EContextType;

    /**
     * The constructor of the class that the decorator is applied to.
     */
    'constructor': IConstructor;
}
