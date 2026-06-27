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

/* eslint-disable */

declare global {

    interface SymbolConstructor {
        readonly metadata: unique symbol;
    }
}

(Symbol as any).metadata ??= Symbol.for('Symbol.metadata');

/* eslint-enable */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The interface for the metadata container objects.
 *
 * > ⚠️ **IMPORTANT**: This API is designed for **modern (Stage 3) decorators**
 * > only. For legacy (Stage 2 / experimental) decorators, use the
 * > [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) module
 * > with `Reflect.defineMetadata()` and `Reflect.getMetadata()` instead.
 */
export interface IClassMetadataContainer {

    /**
     * Get the metadata value by the key.
     *
     * @param key  The metadata key, could be a string or a symbol.
     * @returns The metadata value for the key, or `undefined` if not exists.
     */
    get(key: string | symbol): any;

    /**
     * Set the metadata value for the key. If the key already exists, the
     * existing value will be overwritten.
     *
     * @param key  The metadata key, could be a string or a symbol.
     * @param value The metadata value to set.
     */
    set(key: string | symbol, value: any): void;

    /**
     * Check if the metadata key exists or not.
     *
     * @param key   The metadata key, could be a string or a symbol.
     * @returns `true` if the metadata key exists, or `false` if not exists.
     */
    has(key: string | symbol): boolean;

    /**
     * Remove the metadata key and its value from the container. If the key does
     * not exist, this method does nothing.
     *
     * @param key  The metadata key, could be a string or a symbol.
     */
    remove(key: string | symbol): void;
}

class ClassMetadataContainer implements IClassMetadataContainer {

    private readonly _container: tC.IDict;

    public constructor(container: tC.IDict) {

        this._container = container;
    }

    public get(key: string | symbol): any {
        return this._container[key];
    }

    public set(key: string | symbol, value: any): void {
        this._container[key] = value;
    }

    public has(key: string | symbol): boolean {
        return key in this._container;
    }

    public remove(key: string | symbol): void {
        delete this._container[key];
    }
}

/**
 * Get the metadata container of a class by its constructor. The metadata
 * container is an object that stores metadata for a determined class.
 *
 * The metadata container object will be created if it does not exist.
 *
 * > ⚠️ **IMPORTANT**: This API is designed for **modern (Stage 3) decorators**
 * > only. For legacy (Stage 2 / experimental) decorators, use the
 * > [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) module
 * > with `Reflect.defineMetadata()` and `Reflect.getMetadata()` instead.
 *
 * @param ctor The class constructor.
 * @returns The metadata container object.
 */
export function getMetadataContainer(
    ctor: tC.IConstructor,
): IClassMetadataContainer {

    const container = (ctor as any)[Symbol.metadata] ??= Object.create(null);
    return new ClassMetadataContainer(container);
}
