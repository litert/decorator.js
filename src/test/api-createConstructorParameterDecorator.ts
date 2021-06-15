import * as $Assert from 'assert';
import $Decorators, { IClassCtor, IGeneralDecorator } from '../lib';
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

        const wrongTypedDecorator = $Decorators.createConstructorParameterDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('class', function() {

            try {

                @wrongTypedDecorator
                class Test4createConstructorParameterDecorator {}
                new Test4createConstructorParameterDecorator();
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

                class Test4createConstructorParameterDecorator {

                    @wrongTypedDecorator
                    public value: number = 123;
                }
                new Test4createConstructorParameterDecorator();
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

                class Test4createConstructorParameterDecorator {

                    @wrongTypedDecorator
                    public static value: number = 123;
                }
                new Test4createConstructorParameterDecorator();
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

                class Test4createConstructorParameterDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createConstructorParameterDecorator();
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

                class Test4createConstructorParameterDecorator {

                    @wrongTypedDecorator
                    public static value(): number { return 321; }
                }
                new Test4createConstructorParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('member method parameter', function() {

            try {

                class Test4createConstructorParameterDecorator {

                    public value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createConstructorParameterDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('static method parameter', function() {

            try {

                class Test4createConstructorParameterDecorator {

                    public static value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createConstructorParameterDecorator();
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
