import * as $Assert from 'assert';
import $Decorators, { IGeneralDecorator } from '../lib';
describe('api:createMethodParameterDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createMethodParameterDecorator {

            public value(
                @$Decorators.createMethodParameterDecorator(function() {
                    called = true;
                })
                v: number
            ): number { return v; }
        }

        new Test4createMethodParameterDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class prototype', function() {

        let isPrototype: boolean = false;

        class Test4createMethodParameterDecorator {
            public value(
                @$Decorators.createMethodParameterDecorator(function(proto) {
                    isPrototype = $Decorators.isClassPrototype(proto) && proto.constructor === Test4createMethodParameterDecorator;
                })
                v: number
            ): number { return v; }
        }

        new Test4createMethodParameterDecorator();

        $Assert.strictEqual(isPrototype, true);
    });

    it('should get the second parameter as the decorated method name', function() {

        let propName: string = '';

        class Test4createMethodParameterDecorator {

            public m1(
                @$Decorators.createMethodParameterDecorator(function(proto, pName) {
                    propName = pName as string;
                })
                v: number
            ): number { return v; }
        }

        new Test4createMethodParameterDecorator();

        $Assert.strictEqual(propName, 'm1');
    });

    it('should get the third parameter as the index of decorated method parameter', function() {

        let paramIndex: number = -1;

        class Test4createMethodParameterDecorator {

            public m2(
                a: number,
                @$Decorators.createMethodParameterDecorator(function(proto, pName, pIndex) {
                    paramIndex = pIndex;
                })
                v: number
            ): number { return v; }
        }

        new Test4createMethodParameterDecorator();

        $Assert.strictEqual(paramIndex, 1);
    });

    it('should get class prototype of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createMethodParameterDecorator {

            public m3(
                @$Decorators.createMethodParameterDecorator(function(proto) {
                    expectClsName = proto.constructor.name;
                })
                v: number
            ): number { return v; }
        }

        new Test4createMethodParameterDecorator();
        $Assert.strictEqual(expectClsName, 'Test4createMethodParameterDecorator');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createMethodParameterDecorator {

            public m4(
                @$Decorators.createMethodParameterDecorator(function() {
                    count *= 4;
                })
                @$Decorators.createMethodParameterDecorator(function() {
                    count *= 3;
                })
                v: number
            ): number { return v; }
        }


        new Test4createMethodParameterDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const wrongTypedDecorator = $Decorators.createMethodParameterDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('constructor parameter', function() {

            try {

                class Test4createMethodParameterDecorator {

                    public value: number;

                    public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                }
                new Test4createMethodParameterDecorator(321);
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
                class Test4createMethodParameterDecorator {}
                new Test4createMethodParameterDecorator();
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

                class Test4createMethodParameterDecorator {

                    @wrongTypedDecorator
                    public v: number = 321;
                }
                new Test4createMethodParameterDecorator();
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

                class Test4createMethodParameterDecorator {

                    @wrongTypedDecorator
                    public static value: number = 123;
                }
                new Test4createMethodParameterDecorator();
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

                class Test4createMethodParameterDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createMethodParameterDecorator();
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

                class Test4createMethodParameterDecorator {

                    @wrongTypedDecorator
                    public static value(): number { return 321; }
                }
                new Test4createMethodParameterDecorator();
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

                class Test4createMethodParameterDecorator {

                    public static value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createMethodParameterDecorator();
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
