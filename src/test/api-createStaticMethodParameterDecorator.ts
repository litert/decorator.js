import * as $Assert from 'assert';
import $Decorators, { IGeneralDecorator } from '../lib';
describe('api:createStaticMethodParameterDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createStaticMethodParameterDecorator {

            public static value(
                @$Decorators.createStaticMethodParameterDecorator(function() {
                    called = true;
                })
                v: number
            ): number { return v; }
        }

        new Test4createStaticMethodParameterDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let isCtor: boolean = false;

        class Test4createStaticMethodParameterDecorator {
            public static value(
                @$Decorators.createStaticMethodParameterDecorator(function(ctor) {
                    isCtor = $Decorators.isClassConstructor(ctor) && ctor === Test4createStaticMethodParameterDecorator;
                })
                v: number
            ): number { return v; }
        }

        new Test4createStaticMethodParameterDecorator();

        $Assert.strictEqual(isCtor, true);
    });

    it('should get the second parameter as the decorated method name', function() {

        let propName: string = '';

        class Test4createStaticMethodParameterDecorator {

            public static m1(
                @$Decorators.createStaticMethodParameterDecorator(function(ctor, pName) {
                    propName = pName as string;
                })
                v: number
            ): number { return v; }
        }

        new Test4createStaticMethodParameterDecorator();

        $Assert.strictEqual(propName, 'm1');
    });

    it('should get the third parameter as the index of decorated method parameter', function() {

        let paramIndex: number = -1;

        class Test4createStaticMethodParameterDecorator {

            public static m2(
                a: number,
                @$Decorators.createStaticMethodParameterDecorator(function(ctor, pName, pIndex) {
                    paramIndex = pIndex;
                })
                v: number
            ): number { return v; }
        }

        new Test4createStaticMethodParameterDecorator();

        $Assert.strictEqual(paramIndex, 1);
    });

    it('should get class constructor of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createStaticMethodParameterDecorator {

            public static m3(
                @$Decorators.createStaticMethodParameterDecorator(function(ctor) {
                    expectClsName = ctor.name;
                })
                v: number
            ): number { return v; }
        }

        new Test4createStaticMethodParameterDecorator();
        $Assert.strictEqual(expectClsName, 'Test4createStaticMethodParameterDecorator');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createStaticMethodParameterDecorator {

            public static m4(
                @$Decorators.createStaticMethodParameterDecorator(function() {
                    count *= 4;
                })
                @$Decorators.createStaticMethodParameterDecorator(function() {
                    count *= 3;
                })
                v: number
            ): number { return v; }
        }


        new Test4createStaticMethodParameterDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const wrongTypedDecorator = $Decorators.createStaticMethodParameterDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('constructor parameter', function() {

            try {

                class Test4createStaticMethodParameterDecorator {

                    public value: number;

                    public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                }
                new Test4createStaticMethodParameterDecorator(321);
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('class', function() {

            try {

                @wrongTypedDecorator
                class Test4createStaticMethodParameterDecorator {}
                new Test4createStaticMethodParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('member property', function() {

            try {

                class Test4createStaticMethodParameterDecorator {

                    @wrongTypedDecorator
                    public v: number = 321;
                }
                new Test4createStaticMethodParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('static property', function() {

            try {

                class Test4createStaticMethodParameterDecorator {

                    @wrongTypedDecorator
                    public static value: number = 123;
                }
                new Test4createStaticMethodParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('member method', function() {

            try {

                class Test4createStaticMethodParameterDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createStaticMethodParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('static method', function() {

            try {

                class Test4createStaticMethodParameterDecorator {

                    @wrongTypedDecorator
                    public static value(): number { return 321; }
                }
                new Test4createStaticMethodParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('method parameter', function() {

            try {

                class Test4createStaticMethodParameterDecorator {

                    public value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createStaticMethodParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

    });
});
