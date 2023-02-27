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
import $Decorators, { IClassDecorator, IMethodDecorator, IPropertyDecorator, IStaticMethodDecorator, IStaticPropertyDecorator } from '../lib';
describe('api:composite', function() {

    describe('classes', function() {

        it('nothing wrong while passing empty array in', function(): void {
    
            @$Decorators.composite([] as IClassDecorator[])
            class A {}

            new A();

            $Assert.ok(true);
        });

        it('apply decorators in array order', function() {

            let i = 0;
    
            @$Decorators.composite([
                $Decorators.createClassDecorator(function() {
                    i++;
                }),
                $Decorators.createClassDecorator(function() {
                    i *= 5;
                }),
                $Decorators.createClassDecorator(function() {
                    i *= 12;
                }),
            ])
            class A {}

            new A();

            $Assert.strictEqual(i, 60);
        });

        it('get replaced class in stepped decorators', function(): void {

            let passes: number = 0;
    
            @$Decorators.composite([
                $Decorators.createClassDecorator((ctor) => class B extends ctor {}),
                $Decorators.createClassDecorator(function(ctor): void {

                    if (ctor.name === 'B') {

                        passes++;
                    }
                }),
                $Decorators.createClassDecorator(function(ctor): void {

                    if (ctor.name === 'B') {

                        passes++;
                    }
                }),
            ])
            class A {}

            new A();

            $Assert.strictEqual(passes, 2);
        });

        it('get replaced class finally', function(): void {

            @$Decorators.composite([
                $Decorators.createClassDecorator((ctor) => class B extends ctor {

                    public test(i: number): number { return i + 2; }
                }),
                $Decorators.createClassDecorator((ctor) => class B extends ctor {

                    public test(i: number): number { return i + 3; }
                })
            ])
            class A {

                public test(i: number): number { return i + 1; }
            }

            $Assert.strictEqual(new A().test(3), 6);
        });

        it('always get last replaced class in stepped decorators', function(): void {

            let passes: number = 0;
    
            @$Decorators.composite([
                $Decorators.createClassDecorator((ctor) => class B extends ctor {}),
                $Decorators.createClassDecorator(function(ctor): void {

                    if (ctor.name === 'B') {

                        passes++;
                    }
                }),
                $Decorators.createClassDecorator((ctor) => class C extends ctor {}),
                $Decorators.createClassDecorator(function(ctor): void {

                    if (ctor.name === 'C') {

                        passes++;
                    }
                }),
                $Decorators.createClassDecorator(function(ctor): void {

                    if (ctor.name === 'C') {

                        passes++;
                    }
                }),
            ])
            class A {}

            new A();

            $Assert.strictEqual(passes, 3);
        });
    });

    describe('methods', function() {

        it('nothing wrong while passing empty array in', function(): void {
    
            class A {

                @$Decorators.composite([] as IMethodDecorator[])
                public test1(): void {}
            }

            new A();

            $Assert.ok(true);
        });

        it('apply decorators in array order', function() {

            let i = 0;
    
            class A {

                @$Decorators.composite([
                    $Decorators.createMethodDecorator(function() {
                        i++;
                    }),
                    $Decorators.createMethodDecorator(function() {
                        i *= 5;
                    }),
                    $Decorators.createMethodDecorator(function() {
                        i *= 12;
                    }),
                ])
                public test(): void {}
            }

            new A();

            $Assert.strictEqual(i, 60);
        });

        it('get replaced method in stepped decorators', function(): void {

            let passes: number = 0;

            const anotherFn = function test2(i: number): number { return i * 2; };
    
            class A {

                @$Decorators.composite([
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        dtr.value = anotherFn;
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        if (dtr.value === anotherFn) {

                            passes++;
                        }
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        if (dtr.value === anotherFn) {

                            passes++;
                        }
                    }),
                ])
                public test1(i: number): number { return i * 5; }
            }


            new A();

            $Assert.strictEqual(passes, 2);
        });

        it('get replaced method finally', function(): void {

            const anotherFn1 = function test2(i: number): number { return i * 2; };
            const anotherFn2 = function test2(i: number): number { return i * 10; };
    
            class A {

                @$Decorators.composite([
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        dtr.value = anotherFn1;
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        dtr.value = anotherFn2;
                    }),
                ])
                public test(i: number): number { return i * 5; }
            }

            new A();

            $Assert.strictEqual(new A().test(3), 30);
        });

        it('always get last replaced method in stepped decorators', function(): void {

            let passes: number = 0;
    
            const anotherFn1 = function test2(i: number): number { return i * 2; };
            const anotherFn2 = function test2(i: number): number { return i * 10; };
    
            class A {

                @$Decorators.composite([
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        dtr.value = anotherFn1;
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        if (dtr.value === anotherFn1) {

                            passes++;
                        }
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        dtr.value = anotherFn2;
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        if (dtr.value === anotherFn2) {

                            passes++;
                        }
                    }),
                    $Decorators.createMethodDecorator(function(ctor, name, dtr): void {

                        if (dtr.value === anotherFn2) {

                            passes++;
                        }
                    }),
                ])
                public test1(i: number): number { return i * 5; }
            }

            new A();

            $Assert.strictEqual(passes, 3);
        });
    });

    describe('properties', function() {

        it('nothing wrong while passing empty array in', function(): void {
    
            class A {

                @$Decorators.composite([] as IPropertyDecorator[])
                public test1: number = 321;
            }

            $Assert.strictEqual(new A().test1, 321);
        });

        it('apply decorators in array order', function() {

            let i = 0;
    
            class A {

                @$Decorators.composite([
                    $Decorators.createPropertyDecorator(function() {
                        i++;
                    }),
                    $Decorators.createPropertyDecorator(function() {
                        i *= 5;
                    }),
                    $Decorators.createPropertyDecorator(function() {
                        i *= 12;
                    }),
                ])
                public test1!: number;
            }

            new A();

            $Assert.strictEqual(i, 60);
        });

    });

    describe('static properties', function() {

        it('nothing wrong while passing empty array in', function(): void {
    
            class A {

                @$Decorators.composite([] as IStaticPropertyDecorator[])
                public static test1: number = 233;
            }

            new A();

            $Assert.strictEqual(A.test1, 233);
        });

        it('apply decorators in array order', function() {

            let i = 0;
    
            class A {

                @$Decorators.composite([
                    $Decorators.createStaticPropertyDecorator(function() {
                        i++;
                    }),
                    $Decorators.createStaticPropertyDecorator(function() {
                        i *= 5;
                    }),
                    $Decorators.createStaticPropertyDecorator(function() {
                        i *= 12;
                    }),
                ])
                public static test1: number;
            }

            new A();

            $Assert.strictEqual(i, 60);
        });

    });

    describe('accessor', function() {

        it('nothing wrong while passing empty array in', function(): void {
    
            class A {

                @$Decorators.composite([] as IMethodDecorator[])
                public get test1(): number { return 12345; }
            }

            $Assert.strictEqual(new A().test1, 12345);
        });

        it('apply decorators in array order', function() {

            let i = 0;
    
            class A {

                @$Decorators.composite([
                    $Decorators.createAccessorDecorator(function() {
                        i++;
                    }),
                    $Decorators.createAccessorDecorator(function() {
                        i *= 5;
                    }),
                    $Decorators.createAccessorDecorator(function() {
                        i *= 12;
                    }),
                ])
                public get test1(): number { return 123; }
            }

            new A();

            $Assert.strictEqual(i, 60);
        });

    });

    describe('static accessor', function() {

        it('nothing wrong while passing empty array in', function(): void {
    
            class A {

                @$Decorators.composite([] as IStaticMethodDecorator[])
                public static get test1(): number { return 123; }
            }

            new A();

            $Assert.strictEqual(A.test1, 123);
        });

        it('apply decorators in array order', function() {

            let i = 0;
    
            class A {

                @$Decorators.composite([
                    $Decorators.createStaticAccessorDecorator(function() {
                        i++;
                    }),
                    $Decorators.createStaticAccessorDecorator(function() {
                        i *= 5;
                    }),
                    $Decorators.createStaticAccessorDecorator(function() {
                        i *= 12;
                    }),
                ])
                public static get test1(): number { return 123; }
            }

            new A();

            $Assert.strictEqual(i, 60);
        });

    });
});
