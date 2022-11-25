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
describe('api:createClassDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        @$Decorators.createClassDecorator(function() {

            called = true;
        })
        class Test4createClassDecorator { }

        new Test4createClassDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should compile ok', function() {
        class A {

            @$Decorators.createMethodDecorator(() => { return; })
            public add(a: number, b: number): number {
        
                return a + b;
            }
        
            @$Decorators.createStaticMethodDecorator(() => { return; })
            public static multiple(a: number, b: number): number {
        
                return a * b;
            }
        }

        new A();

        $Assert.ok(true);
    });

    it('should get the first parameter as a class constructor', function() {

        let expectCtor!: IClassCtor;

        @$Decorators.createClassDecorator(function(ctor) {
            expectCtor = ctor;
        })
        class Test4createClassDecorator { }

        new Test4createClassDecorator();

        $Assert.strictEqual(
            expectCtor === Test4createClassDecorator,
            true
        );
    });

    it('should get class constructor of the decorated class', function() {

        let expectClsName: string = '';

        @$Decorators.createClassDecorator(function(ctor) {

            expectClsName = ctor.name;
        })
        class Test4createClassDecoratorName { }

        new Test4createClassDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createClassDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        @$Decorators.createClassDecorator(function() {

            count *= 4;
        })
        @$Decorators.createClassDecorator(function() {

            count *= 3;
        })
        class Test4createClassDecorator {

        }

        new Test4createClassDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const theDecorator = $Decorators.createClassDecorator(function() {

            return;

        }) as IGeneralDecorator;

        TestKits.generateConstructorParameterDecoratorFailTest(theDecorator);
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
