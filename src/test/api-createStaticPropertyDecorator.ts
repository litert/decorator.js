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
import $Decorators, { IGeneralDecorator } from '../lib';
import * as TestKits from './kits';
describe('api:createStaticPropertyDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function() {

                called = true;
            })
            public static value: number = 321;
        }

        new Test4createStaticPropertyDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let isCtor: boolean = false;

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function(ctor) {
                isCtor = ctor === Test4createStaticPropertyDecorator;
            })
            public static value: number = 312;
        }

        new Test4createStaticPropertyDecorator();

        $Assert.strictEqual(isCtor, true);
    });

    it('should get the second parameter as the decorated property name', function() {

        let propName: string = '';

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function(ctor, pName) {
                propName = pName as string;
            })
            public static value: number = 312;
        }

        new Test4createStaticPropertyDecorator();

        $Assert.strictEqual(propName, 'value');
    });

    it('should get class constructor of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createStaticPropertyDecoratorName {

            @$Decorators.createStaticPropertyDecorator(function(ctor) {

                expectClsName = ctor.name;
            })
            public static v: number = 321;
        }

        new Test4createStaticPropertyDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createStaticPropertyDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function() {

                count *= 4;
            })
            @$Decorators.createStaticPropertyDecorator(function() {

                count *= 3;
            })
            public static v: number = 333;
        }

        new Test4createStaticPropertyDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const theDecorator = $Decorators.createStaticPropertyDecorator(function() {

            return;

        }) as IGeneralDecorator;

        TestKits.generateClassDecoratorFailTest(theDecorator);
        TestKits.generateConstructorParameterDecoratorFailTest(theDecorator);
        TestKits.generatePropertyDecoratorFailTest(theDecorator);
        // TestKits.generateStaticPropertyDecoratorFailTest(theDecorator);
        TestKits.generateMethodDecoratorFailTest(theDecorator);
        TestKits.generateMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateGetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticGetterDecoratorFailTest(theDecorator);
        TestKits.generateSetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticSetterDecoratorFailTest(theDecorator);
    });
});
