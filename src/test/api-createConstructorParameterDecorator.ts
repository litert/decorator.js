/**
 * Copyright 2022 Angus.Fenying <fenying@litert.org>
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
import $Decorators, { IClassCtor, IGeneralDecorator } from '../lib';
import * as TestKits from './kits';
describe('api:createConstructorParameterDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createConstructorParameterDecorator {

            public value: number;

            public constructor(
                @$Decorators.createConstructorParameterDecorator(function() {

                    called = true;
                })
                v: number
            ) {

                this.value = v;
            }
        }

        new Test4createConstructorParameterDecorator(123);

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let expectCtor!: IClassCtor;

        class Test4createConstructorParameterDecorator {

            public value: number;

            public constructor(
                @$Decorators.createConstructorParameterDecorator(function(ctor) {

                    expectCtor = ctor;
                })
                v: number
            ) {

                this.value = v;
            }
        }

        new Test4createConstructorParameterDecorator(321);

        $Assert.strictEqual(
            expectCtor === Test4createConstructorParameterDecorator,
            true
        );
    });

    it('should get the second parameter as the index of decorated method parameter', function() {

        let paramIndex: number = -1;

        class Test4createConstructorParameterDecorator {

            public value: number;

            public constructor(
                a: number,
                @$Decorators.createConstructorParameterDecorator(function(proto, pIndex) {
                    paramIndex = pIndex;
                })
                v: number
            ) {

                this.value = v + a;
            }
        }

        new Test4createConstructorParameterDecorator(32, 11);

        $Assert.strictEqual(paramIndex, 1);
    });

    it('should get class constructor of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createConstructorParameterDecoratorName {

            public value: number;

            public constructor(
                @$Decorators.createConstructorParameterDecorator(function(ctor) {

                    expectClsName = ctor.name;
                })
                v: number
            ) {

                this.value = v;
            }
        }


        new Test4createConstructorParameterDecoratorName(233);
        $Assert.strictEqual(expectClsName, 'Test4createConstructorParameterDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createConstructorParameterDecorator {

            public value: number;

            public constructor(
                @$Decorators.createConstructorParameterDecorator(function() {

                    count *= 4;
                })
                @$Decorators.createConstructorParameterDecorator(function() {

                    count *= 3;
                })
                v: number
            ) {

                this.value = v;
            }
        }


        new Test4createConstructorParameterDecorator(666);
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const theDecorator = $Decorators.createConstructorParameterDecorator(function() {

            return;

        }) as IGeneralDecorator;

        TestKits.generateClassDecoratorFailTest(theDecorator);
        TestKits.generatePropertyDecoratorFailTest(theDecorator);
        TestKits.generateStaticPropertyDecoratorFailTest(theDecorator);
        TestKits.generateMethodDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodDecoratorFailTest(theDecorator);
        TestKits.generateMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateGetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticGetterDecoratorFailTest(theDecorator);
        TestKits.generateSetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticSetterDecoratorFailTest(theDecorator);
    });
});
