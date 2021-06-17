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
import $Decorators, { IGeneralDecorator } from '../lib';
import * as TestKits from './kits';
describe('api:createStaticAccessorDecorator-Setter', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createStaticAccessorDecorator {

            @$Decorators.createStaticAccessorDecorator(function() {

                called = true;
            })
            public static set value(v: number) {}
        }

        new Test4createStaticAccessorDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let isPrototype: boolean = false;

        class Test4createStaticAccessorDecorator {

            @$Decorators.createStaticAccessorDecorator(function(ctor) {
                isPrototype = $Decorators.isClassConstructor(ctor) && ctor === Test4createStaticAccessorDecorator;
            })
            public static set value(v: number) {}
        }

        new Test4createStaticAccessorDecorator();

        $Assert.strictEqual(isPrototype, true);
    });

    it('should get the second parameter as the decorated method name', function() {

        let propName: string = '';

        class Test4createStaticAccessorDecorator {

            @$Decorators.createStaticAccessorDecorator(function(proto, pName) {
                propName = pName as string;
            })
            public static set m1(v: number) {}
        }

        new Test4createStaticAccessorDecorator();

        $Assert.strictEqual(propName, 'm1');
    });

    it('should get the third parameter as the decorated method descriptor object', function() {

        let isDtrObject: boolean = false;

        class Test4createStaticAccessorDecorator {

            @$Decorators.createStaticAccessorDecorator(function(proto, pName, pDtr) {
                isDtrObject = typeof pDtr === 'object';
            })
            public static set m1(v: number) {}
        }

        new Test4createStaticAccessorDecorator();

        $Assert.strictEqual(isDtrObject, true);
    });

    it('should get class prototype of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createStaticAccessorDecoratorName {

            @$Decorators.createStaticAccessorDecorator(function(proto) {

                expectClsName = proto.name;
            })
            public static set v(v: number) {}
        }

        new Test4createStaticAccessorDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createStaticAccessorDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createStaticAccessorDecorator {

            @$Decorators.createStaticAccessorDecorator(function() {

                count *= 4;
            })
            @$Decorators.createStaticAccessorDecorator(function() {

                count *= 3;
            })
            public static set v(v: number) {}
        }

        new Test4createStaticAccessorDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const theDecorator = $Decorators.createStaticAccessorDecorator(function() {

            return;

        }) as IGeneralDecorator;

        TestKits.generateClassDecoratorFailTest(theDecorator);
        TestKits.generateConstructorParameterDecoratorFailTest(theDecorator);
        TestKits.generatePropertyDecoratorFailTest(theDecorator);
        TestKits.generateStaticPropertyDecoratorFailTest(theDecorator);
        TestKits.generateMethodDecoratorFailTest(theDecorator);
        TestKits.generateMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateGetterDecoratorFailTest(theDecorator);
        // TestKits.generateStaticGetterDecoratorFailTest(theDecorator);
        TestKits.generateSetterDecoratorFailTest(theDecorator);
        // TestKits.generateStaticSetterDecoratorFailTest(theDecorator);
    });
});
 