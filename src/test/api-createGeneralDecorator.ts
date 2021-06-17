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

function testConstructorParameterDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[ctor-param]            should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                public val: number;
    
                public constructor(@decorator v: number) { this.val = v; }
            }
    
            new Test(123);
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testClassDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[class]                 should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            @decorator
            class Test {

                public val: number = 233;
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testPropertyDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[prop]                  should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                @decorator
                public val: number = 233;
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testStaticPropertyDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[static-prop]           should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                @decorator
                public static val: number = 233;
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testMethodDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[method]                should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                @decorator
                public val(): number { return 123; }
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testStaticMethodDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[static-method]         should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                @decorator
                public static val(): number { return 123; }
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testMethodParameterDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[method-param]          should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                public val(@decorator v: number): number { return v; }
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

function testStaticMethodParameterDecorator(decorator: IGeneralDecorator, expected: 'ok' | 'error'): void {

    it(`[static-method-param]   should ${expected === 'ok' ? `be appliable` : `throw TypeError`}`, function() {

        try {

            class Test {

                public static val(@decorator v: number): number { return v; }
            }
    
            new Test();
            $Assert.strictEqual(expected, 'ok');
            return;
        }
        catch (e) {

            if (e instanceof TypeError) {

                $Assert.strictEqual(expected, 'error');
                return;
            }
        }
        $Assert.strictEqual(expected, 'unexpected ending');
    });
}

describe('api:createGeneralDecorator', function() {

    describe('For non-allowed general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({});

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For class-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'class': function() {}
        });

        testClassDecorator(decorator, 'ok');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For ctor-param-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'ctorParameter': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'ok');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For prop-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'property': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'ok');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For static-prop-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'staticProperty': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'ok');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For method-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'method': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'ok');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For static-method-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'staticMethod': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'ok');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For method-param-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'methodParameter': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'ok');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'error');
    });

    describe('For static-method-param-only general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'staticMethodParameter': function() {}
        });

        testClassDecorator(decorator, 'error');
        testConstructorParameterDecorator(decorator, 'error');
        testPropertyDecorator(decorator, 'error');
        testMethodDecorator(decorator, 'error');
        testMethodParameterDecorator(decorator, 'error');
        testStaticPropertyDecorator(decorator, 'error');
        testStaticMethodDecorator(decorator, 'error');
        testStaticMethodParameterDecorator(decorator, 'ok');
    });

    describe('For all-allowed general decorator', function() {

        const decorator = $Decorators.createGeneralDecorator({
            'class': function() {},
            'ctorParameter': function() {},
            'method': function() {},
            'staticMethod': function() {},
            'property': function() {},
            'staticProperty': function() {},
            'methodParameter': function() {},
            'staticMethodParameter': function() {},
        });

        testClassDecorator(decorator, 'ok');
        testConstructorParameterDecorator(decorator, 'ok');
        testPropertyDecorator(decorator, 'ok');
        testMethodDecorator(decorator, 'ok');
        testMethodParameterDecorator(decorator, 'ok');
        testStaticPropertyDecorator(decorator, 'ok');
        testStaticMethodDecorator(decorator, 'ok');
        testStaticMethodParameterDecorator(decorator, 'ok');
    });
});
