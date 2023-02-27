/**
 * Copyright 2023 Angus.Fenying <fenying@litert.org>
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

describe('api:getOwnMethodNames', function() {

    const mark = $Decorators.createMethodDecorator(function() {});
    const gMark = $Decorators.createGeneralDecorator({ method() {}, staticMethod() {} });

    it('should get non-static methods decorated by decorator.js only', function() {

        class A {

            @mark
            public a(): string { return '321'; }

            public b(): string { return '321'; }

            @mark
            public c(): number { return 321; }

            @gMark
            public static d(): number { return 321; }
        }

        $Assert.strictEqual($Decorators.getOwnMethodNames(A).sort().join(','), 'a,c');
    });
    it('should get all decorated methods when hook of "reflect-metadata" on', function() {

        $Decorators.hookNativeReflectMetadata();

        class A {

            @mark
            public a(): string { return '321'; }

            @Reflect.metadata('ffff', 'test')
            public b(): string { return '321'; }

            @mark
            public c(): number { return 321; }

        }


        $Assert.strictEqual($Decorators.getOwnMethodNames(A).sort().join(','), 'a,b,c');

        $Decorators.hookNativeReflectMetadata(false);
    });

    it('should get methods decorated by decorator.js only while using general decorator', function() {

        class A {

            @gMark
            public a(): string { return '321'; }

            @Reflect.metadata('ffff', 'test')
            public b(): string { return '321'; }

            @gMark
            public c(): number { return 321; }

        }


        $Assert.strictEqual($Decorators.getOwnMethodNames(A).sort().join(','), 'a,c');
    });
});
