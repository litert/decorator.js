import * as $Assert from 'assert';
import $Decorators, { IGeneralDecorator } from '../lib';
describe('api:createStaticMethodDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createStaticMethodDecorator {

            @$Decorators.createStaticMethodDecorator(function() {

                called = true;
            })
            public static value(): number { return 321; }
        }

        new Test4createStaticMethodDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let isPrototype: boolean = false;

        class Test4createStaticMethodDecorator {

            @$Decorators.createStaticMethodDecorator(function(ctor) {
                isPrototype = $Decorators.isClassConstructor(ctor) && ctor === Test4createStaticMethodDecorator;
            })
            public static value(): number { return 321; }
        }

        new Test4createStaticMethodDecorator();

        $Assert.strictEqual(isPrototype, true);
    });

    it('should get the second parameter as the decorated method name', function() {

        let propName: string = '';

        class Test4createStaticMethodDecorator {

            @$Decorators.createStaticMethodDecorator(function(proto, pName) {
                propName = pName as string;
            })
            public static m1(): number { return 321; }
        }

        new Test4createStaticMethodDecorator();

        $Assert.strictEqual(propName, 'm1');
    });

    it('should get the third parameter as the decorated method descriptor object', function() {

        let isDtrObject: boolean = false;

        class Test4createStaticMethodDecorator {

            @$Decorators.createStaticMethodDecorator(function(proto, pName, pDtr) {
                isDtrObject = typeof pDtr === 'object';
            })
            public static m1(): number { return 321; }
        }

        new Test4createStaticMethodDecorator();

        $Assert.strictEqual(isDtrObject, true);
    });

    it('should get class prototype of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createStaticMethodDecoratorName {

            @$Decorators.createStaticMethodDecorator(function(proto) {

                expectClsName = proto.name;
            })
            public static value(): number { return 321; }
        }

        new Test4createStaticMethodDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createStaticMethodDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createStaticMethodDecorator {

            @$Decorators.createStaticMethodDecorator(function() {

                count *= 4;
            })
            @$Decorators.createStaticMethodDecorator(function() {

                count *= 3;
            })
            public static value(): number { return 321; }
        }

        new Test4createStaticMethodDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const wrongTypedDecorator = $Decorators.createStaticMethodDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('constructor parameter', function() {

            try {

                class Test4createStaticMethodDecorator {

                    public value: number;

                    public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                }
                new Test4createStaticMethodDecorator(321);
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
                class Test4createStaticMethodDecorator {}
                new Test4createStaticMethodDecorator();
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

                class Test4createStaticMethodDecorator {

                    @wrongTypedDecorator
                    public v: number = 321;
                }
                new Test4createStaticMethodDecorator();
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

                class Test4createStaticMethodDecorator {

                    @wrongTypedDecorator
                    public static value: number = 123;
                }
                new Test4createStaticMethodDecorator();
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

                class Test4createStaticMethodDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createStaticMethodDecorator();
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

                class Test4createStaticMethodDecorator {

                    public value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createStaticMethodDecorator();
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

                class Test4createStaticMethodDecorator {

                    public static value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createStaticMethodDecorator();
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
