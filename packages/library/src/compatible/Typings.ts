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

/**
 * A property key supported by the compatible decorator context types.
 */
export type IPropertyKey = string | symbol;

/**
 * The minimal metadata carrier shape shared by locally declared modern
 * decorator contexts.
 */
export interface IModernMetadataCarrier {

    /**
     * Metadata storage provided by TypeScript's standard decorators transform.
     */
    readonly metadata?: Record<PropertyKey, unknown>;
}

/**
 * The common fields shared by locally declared modern member decorator
 * contexts.
 */
export interface IModernElementContextBase<
    TKind extends string,
    TStatic extends boolean
> extends IModernMetadataCarrier {

    /**
     * The kind of standard decorator context.
     */
    readonly kind: TKind;

    /**
     * The decorated member name.
     */
    readonly name: IPropertyKey;

    /**
     * Whether the decorated member is static.
     */
    readonly static: TStatic;

    /**
     * Whether the decorated member is private.
     */
    readonly private?: boolean;

    /**
     * Register an initializer for the decorated class/member.
     */
    readonly addInitializer?: (initializer: (this: any) => void) => void;
}

/**
 * The locally declared modern method decorator context shape.
 */
export type IModernMethodContext<
    TStatic extends boolean
> = IModernElementContextBase<'method', TStatic>;

/**
 * The locally declared modern field decorator context shape.
 */
export type IModernFieldContext<
    TStatic extends boolean
> = IModernElementContextBase<'field', TStatic>;

/**
 * The locally declared modern accessor decorator context shape.
 */
export type IModernAccessorContext<
    TStatic extends boolean
> = IModernElementContextBase<'accessor', TStatic>;

/**
 * The locally declared modern getter decorator context shape.
 */
export type IModernGetterContext<
    TStatic extends boolean
> = IModernElementContextBase<'getter', TStatic>;

/**
 * The locally declared modern setter decorator context shape.
 */
export type IModernSetterContext<
    TStatic extends boolean
> = IModernElementContextBase<'setter', TStatic>;

/**
 * The value passed to modern accessor decorators.
 */
export interface IModernAccessorTarget<TValue = any, TThis = any> {

    /**
     * Get the current accessor value.
     */
    get(this: TThis): TValue;

    /**
     * Set the current accessor value.
     */
    set(this: TThis, value: TValue): void;
}

/**
 * The replacement object that a modern accessor decorator can return.
 */
export interface IModernAccessorResult<TValue = any, TThis = any> {

    /**
     * Replacement getter for the accessor.
     */
    get?(this: TThis): TValue;

    /**
     * Replacement setter for the accessor.
     */
    set?(this: TThis, value: TValue): void;

    /**
     * Replacement initializer for the accessor value.
     */
    init?(this: TThis, value: TValue): TValue;
}

/**
 * The initializer function that a modern field decorator can return.
 */
export type IModernFieldInitializer<TValue = any, TThis = any> = (
    this: TThis,
    value: TValue
) => TValue;
