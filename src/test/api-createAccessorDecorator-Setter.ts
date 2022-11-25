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
import $Decorators, { IGeneralDecorator } from '../lib';
import * as TestKits from './kits';
describe('api:createAccessorDecorator-Setter', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createAccessorDecorator {

            @$Decorators.createAccessorDecorator(function() {

                called = true;
            })
            public set value(v: number) {}
        }

        new Test4createAccessorDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class prototype', function() {

        let isPrototype: boolean = false;

        class Test4createAccessorDecorator {

            @$Decorators.createAccessorDecorator(function(proto) {
                isPrototype = $Decorators.isClassPrototype(proto) && proto.constructor === Test4createAccessorDecorator;
            })
            public set value(v: number) {}
        }

        new Test4createAccessorDecorator();

        $Assert.strictEqual(isPrototype, true);
    });

    it('should get the second parameter as the decorated method name', function() {

        let propName: string = '';

        class Test4createAccessorDecorator {

            @$Decorators.createAccessorDecorator(function(proto, pName) {
                propName = pName as string;
            })
            public set m1(v: number) {}
        }

        new Test4createAccessorDecorator();

        $Assert.strictEqual(propName, 'm1');
    });

    it('should get the third parameter as the decorated method descriptor object', function() {

        let isDtrObject: boolean = false;

        class Test4createAccessorDecorator {

            @$Decorators.createAccessorDecorator(function(proto, pName, pDtr) {
                isDtrObject = typeof pDtr === 'object';
            })
            public set m1(v: number) {}
        }

        new Test4createAccessorDecorator();

        $Assert.strictEqual(isDtrObject, true);
    });

    it('should get class prototype of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createAccessorDecoratorName {

            @$Decorators.createAccessorDecorator(function(proto) {

                expectClsName = proto.constructor.name;
            })
            public set value(v: number) {}
        }

        new Test4createAccessorDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createAccessorDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createAccessorDecorator {

            @$Decorators.createAccessorDecorator(function() {

                count *= 4;
            })
            @$Decorators.createAccessorDecorator(function() {

                count *= 3;
            })
            public set value(v: number) {}
        }

        new Test4createAccessorDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const theDecorator = $Decorators.createAccessorDecorator(function() {

            return;

        }) as IGeneralDecorator;

        TestKits.generateClassDecoratorFailTest(theDecorator);
        TestKits.generateConstructorParameterDecoratorFailTest(theDecorator);
        TestKits.generatePropertyDecoratorFailTest(theDecorator);
        TestKits.generateStaticPropertyDecoratorFailTest(theDecorator);
        TestKits.generateMethodDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodDecoratorFailTest(theDecorator);
        TestKits.generateMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodParameterDecoratorFailTest(theDecorator);
        // TestKits.generateGetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticGetterDecoratorFailTest(theDecorator);
        // TestKits.generateSetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticSetterDecoratorFailTest(theDecorator);
    });
});
