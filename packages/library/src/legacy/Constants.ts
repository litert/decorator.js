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

/**
 * The normalized type tags for legacy unified decorator contexts.
 */
export enum EContextType {

    CLASS = 'class',

    ACCESSOR = 'accessor',

    GETTER = 'getter',

    SETTER = 'setter',

    METHOD = 'method',

    PROPERTY = 'property',

    CONSTRUCTOR_PARAMETER = 'constructor_parameter',

    METHOD_PARAMETER = 'method_parameter',

    STATIC_ACCESSOR = 'static_accessor',

    STATIC_GETTER = 'static_getter',

    STATIC_SETTER = 'static_setter',

    STATIC_METHOD = 'static_method',

    STATIC_PROPERTY = 'static_property',

    STATIC_METHOD_PARAMETER = 'static_method_parameter',
}
