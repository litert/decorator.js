import * as $Assert from 'assert';
import $Decorators, { IGeneralDecorator } from '../lib';
describe('api:createPropertyDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        class Test4createPropertyDecorator {

            @$Decorators.createPropertyDecorator(function() {

                called = true;
            })
            public value: number = 321;
        }

        new Test4createPropertyDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class prototype', function() {

        let isPrototype: boolean = false;

        class Test4createPropertyDecorator {

            @$Decorators.createPropertyDecorator(function(proto) {
                isPrototype = $Decorators.isClassPrototype(proto) && proto.constructor === Test4createPropertyDecorator;
            })
            public value: number = 312;
        }

        new Test4createPropertyDecorator();

        $Assert.strictEqual(isPrototype, true);
    });

    it('should get the second parameter as the decorated property name', function() {

        let propName: string = '';

        class Test4createPropertyDecorator {

            @$Decorators.createPropertyDecorator(function(proto, pName) {
                propName = pName as string;
            })
            public value: number = 312;
        }

        new Test4createPropertyDecorator();

        $Assert.strictEqual(propName, 'value');
    });

    it('should get class prototype of the decorated class', function() {

        let expectClsName: string = '';

        class Test4createPropertyDecoratorName {

            @$Decorators.createPropertyDecorator(function(proto) {

                expectClsName = proto.constructor.name;
            })
            public v: number = 321;
        }

        new Test4createPropertyDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createPropertyDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        class Test4createPropertyDecorator {

            @$Decorators.createPropertyDecorator(function() {

                count *= 4;
            })
            @$Decorators.createPropertyDecorator(function() {

                count *= 3;
            })
            public v: number = 333;
        }

        new Test4createPropertyDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const wrongTypedDecorator = $Decorators.createPropertyDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('constructor parameter', function() {

            try {

                class Test4createPropertyDecorator {

                    public value: number;

                    public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                }
                new Test4createPropertyDecorator(321);
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
                class Test4createPropertyDecorator {}
                new Test4createPropertyDecorator();
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

                class Test4createPropertyDecorator {

                    @wrongTypedDecorator
                    public static value: number = 123;
                }
                new Test4createPropertyDecorator();
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

                class Test4createPropertyDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createPropertyDecorator();
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

                class Test4createPropertyDecorator {

                    @wrongTypedDecorator
                    public static value(): number { return 321; }
                }
                new Test4createPropertyDecorator();
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

                class Test4createPropertyDecorator {

                    public value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createPropertyDecorator();
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

                class Test4createPropertyDecorator {

                    public static value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createPropertyDecorator();
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
