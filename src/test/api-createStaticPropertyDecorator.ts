import * as $Assert from 'assert';
import $Decorators, { IGeneralDecorator } from '../lib';
describe('api:createStaticPropertyDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function() {

                called = true;
            })
            public static value: number = 321;
        }

        new Test4createStaticPropertyDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let isCtor: boolean = false;

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function(ctor) {
                isCtor = ctor === Test4createStaticPropertyDecorator;
            })
            public static value: number = 312;
        }

        new Test4createStaticPropertyDecorator();

        $Assert.strictEqual(isCtor, true);
    });

    it('should get the second parameter as the decorated property name', function() {

        let propName: string = '';

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function(ctor, pName) {
                propName = pName as string;
            })
            public static value: number = 312;
        }

        new Test4createStaticPropertyDecorator();

        $Assert.strictEqual(propName, 'value');
    });

    it('should get class constructor of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createStaticPropertyDecoratorName {

            @$Decorators.createStaticPropertyDecorator(function(ctor) {

                expectClsName = ctor.name;
            })
            public static v: number = 321;
        }

        new Test4createStaticPropertyDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createStaticPropertyDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createStaticPropertyDecorator {

            @$Decorators.createStaticPropertyDecorator(function() {

                count *= 4;
            })
            @$Decorators.createStaticPropertyDecorator(function() {

                count *= 3;
            })
            public static v: number = 333;
        }

        new Test4createStaticPropertyDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const wrongTypedDecorator = $Decorators.createStaticPropertyDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('constructor parameter', function() {

            try {

                class Test4createStaticPropertyDecorator {

                    public value: number;

                    public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                }
                new Test4createStaticPropertyDecorator(321);
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
                class Test4createStaticPropertyDecorator {}
                new Test4createStaticPropertyDecorator();
            }
            catch (e: unknown) {

                if (e instanceof TypeError) {

                    $Assert.ok(true);
                    return;
                }
            }

            $Assert.fail();
        });

        it('property', function() {

            try {

                class Test4createStaticPropertyDecorator {

                    @wrongTypedDecorator
                    public value: number = 123;
                }
                new Test4createStaticPropertyDecorator();
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

                class Test4createStaticPropertyDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createStaticPropertyDecorator();
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

                class Test4createStaticPropertyDecorator {

                    @wrongTypedDecorator
                    public static value(): number { return 321; }
                }
                new Test4createStaticPropertyDecorator();
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

                class Test4createStaticPropertyDecorator {

                    public value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createStaticPropertyDecorator();
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

                class Test4createStaticPropertyDecorator {

                    public static value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createStaticPropertyDecorator();
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
