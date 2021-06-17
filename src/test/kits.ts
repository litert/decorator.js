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
import { IGeneralDecorator } from '../lib';

export function generateConstructorParameterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {
    
    it('constructor parameter', function() {

        try {

            class FailureTest {

                public value: number;

                public constructor(@wrongTypedDecorator v: number) { this.value = v; }
            }
            new FailureTest(321);
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateClassDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {
    
    it('class', function() {

        try {

            @wrongTypedDecorator
            class FailureTest {}
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });

}

export function generatePropertyDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('member property', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public value: number = 123;
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateStaticPropertyDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {
    it('static property', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public static value: number = 123;
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateMethodDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('member method', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public value(): number { return 321; }
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateStaticMethodDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('static method', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public static value(): number { return 321; }
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateMethodParameterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {
    it('member method parameter', function() {

        try {

            class FailureTest {

                public value(@wrongTypedDecorator v: number): number { return v; }
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateStaticMethodParameterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('static method parameter', function() {

        try {

            class FailureTest {

                public static value(@wrongTypedDecorator v: number): number { return v; }
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateGetterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('member getter', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public get value(): number { return 321; }
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateStaticGetterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('static getter', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public static get value(): number { return 321; }
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateSetterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('member setter', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public set value(v: number) {}
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}

export function generateStaticSetterDecoratorFailTest(wrongTypedDecorator: IGeneralDecorator): void {

    it('member setter', function() {

        try {

            class FailureTest {

                @wrongTypedDecorator
                public static set value(v: number) {}
            }
            new FailureTest();
        }
        catch (e: unknown) {

            if (e instanceof TypeError) {

                $Assert.ok(true);
                return;
            }
        }

        $Assert.fail();
    });
}
