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
describe('api:createMethodDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createMethodDecorator {

            @$Decorators.createMethodDecorator(function() {

                called = true;
            })
            public value(): number { return 321; }
        }

        new Test4createMethodDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class prototype', function() {

        let isPrototype: boolean = false;

        class Test4createMethodDecorator {

            @$Decorators.createMethodDecorator(function(proto) {
                isPrototype = $Decorators.isClassPrototype(proto) && proto.constructor === Test4createMethodDecorator;
            })
            public value(): number { return 321; }
        }

        new Test4createMethodDecorator();

        $Assert.strictEqual(isPrototype, true);
    });

    it('should get the second parameter as the decorated method name', function() {

        let propName: string = '';

        class Test4createMethodDecorator {

            @$Decorators.createMethodDecorator(function(proto, pName) {
                propName = pName as string;
            })
            public m1(): number { return 321; }
        }

        new Test4createMethodDecorator();

        $Assert.strictEqual(propName, 'm1');
    });

    it('should get the third parameter as the decorated method descriptor object', function() {

        let isDtrObject: boolean = false;

        class Test4createMethodDecorator {

            @$Decorators.createMethodDecorator(function(proto, pName, pDtr) {
                isDtrObject = typeof pDtr === 'object';
            })
            public m1(): number { return 321; }
        }

        new Test4createMethodDecorator();

        $Assert.strictEqual(isDtrObject, true);
    });

    it('should get class prototype of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createMethodDecoratorName {

            @$Decorators.createMethodDecorator(function(proto) {

                expectClsName = proto.constructor.name;
            })
            public value(): number { return 321; }
        }

        new Test4createMethodDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createMethodDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createMethodDecorator {

            @$Decorators.createMethodDecorator(function() {

                count *= 4;
            })
            @$Decorators.createMethodDecorator(function() {

                count *= 3;
            })
            public value(): number { return 321; }
        }

        new Test4createMethodDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const theDecorator = $Decorators.createMethodDecorator(function() {

            return;

        }) as IGeneralDecorator;

        TestKits.generateClassDecoratorFailTest(theDecorator);
        TestKits.generateConstructorParameterDecoratorFailTest(theDecorator);
        TestKits.generatePropertyDecoratorFailTest(theDecorator);
        TestKits.generateStaticPropertyDecoratorFailTest(theDecorator);
        // TestKits.generateMethodDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodDecoratorFailTest(theDecorator);
        TestKits.generateMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateStaticMethodParameterDecoratorFailTest(theDecorator);
        TestKits.generateGetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticGetterDecoratorFailTest(theDecorator);
        TestKits.generateSetterDecoratorFailTest(theDecorator);
        TestKits.generateStaticSetterDecoratorFailTest(theDecorator);
    });
});
