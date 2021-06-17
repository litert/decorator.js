/**
 * Copyright 2021 Angus.Fenying <fenying@litert.org>
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

import * as $Assert from 'assert';
import $Decorators from '../lib';
import 'reflect-metadata';

describe('api:getOwnPropertyNames', function() {

    const mark = $Decorators.createPropertyDecorator(function() {});
    const gMark = $Decorators.createGeneralDecorator({ property() {}, staticProperty() {} });

    it('should get non-static properties decorated by decorator.js only', function() {

        class A {

            @mark
            public a!: string;

            public b!: string;

            @mark
            public c!: string;

            @gMark
            public static d: string;
        }

        $Assert.strictEqual($Decorators.getOwnPropertyNames(A).sort().join(','), 'a,c');
    });

    it('should get all decorated properties when hook of "reflect-metadata" on', function() {

        $Decorators.hookNativeReflectMetadata();

        class A {

            @mark
            public a!: string;

            @Reflect.metadata('ffff', 'test')
            public b!: string;

            @mark
            public c!: string;
        }

        $Assert.strictEqual($Decorators.getOwnPropertyNames(A).sort().join(','), 'a,b,c');

        $Decorators.hookNativeReflectMetadata(false);
    });

    it('should get properties decorated by decorator.js only while using general decorator', function() {

        class A {

            @gMark
            public a!: string;

            @Reflect.metadata('ffff', 'test')
            public b!: string;

            @gMark
            public c!: string;
        }

        $Assert.strictEqual($Decorators.getOwnPropertyNames(A).sort().join(','), 'a,c');
    });
});
