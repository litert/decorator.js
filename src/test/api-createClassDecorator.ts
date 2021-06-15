import * as $Assert from 'assert';
import $Decorators, { IClassCtor, IGeneralDecorator } from '../lib';
describe('api:createClassDecorator', function() {

    it('should invoke the processor callback', function() {

        let called = false;

        @$Decorators.createClassDecorator(function() {

            called = true;
        })
        class Test4createClassDecorator { }

        new Test4createClassDecorator();

        $Assert.strictEqual(called, true);
    });

    it('should get the first parameter as a class constructor', function() {

        let expectCtor!: IClassCtor;

        @$Decorators.createClassDecorator(function(ctor) {
            expectCtor = ctor;
        })
        class Test4createClassDecorator { }

        new Test4createClassDecorator();

        $Assert.strictEqual(
            expectCtor === Test4createClassDecorator,
            true
        );
    });

    it('should get class constructor of the decorated class', function() {

        let expectClsName: string = '';

        @$Decorators.createClassDecorator(function(ctor) {

            expectClsName = ctor.name;
        })
        class Test4createClassDecoratorName { }

        new Test4createClassDecoratorName();
        $Assert.strictEqual(expectClsName, 'Test4createClassDecoratorName');
    });

    it('should call all the decorator processor callbacks', function() {

        let count = 1;

        @$Decorators.createClassDecorator(function() {

            count *= 4;
        })
        @$Decorators.createClassDecorator(function() {

            count *= 3;
        })
        class Test4createClassDecorator {

        }

        new Test4createClassDecorator();
        $Assert.strictEqual(count, 12);
    });

    describe('should throw TypeError if decorating wrong position', function() {

        const wrongTypedDecorator = $Decorators.createClassDecorator(function() {

            return;

        }) as IGeneralDecorator;

        it('constructor parameter', function() {

            try {

                class Test4createClassDecorator {

                    public value: number;

                    public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                }
                new Test4createClassDecorator(321);
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

                class Test4createClassDecorator {

                    @wrongTypedDecorator
                    public value: number = 123;
                }
                new Test4createClassDecorator();
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

                class Test4createClassDecorator {

                    @wrongTypedDecorator
                    public static value: number = 123;
                }
                new Test4createClassDecorator();
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

                class Test4createClassDecorator {

                    @wrongTypedDecorator
                    public value(): number { return 321; }
                }
                new Test4createClassDecorator();
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

                class Test4createClassDecorator {

                    @wrongTypedDecorator
                    public static value(): number { return 321; }
                }
                new Test4createClassDecorator();
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

                class Test4createClassDecorator {

                    public value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createClassDecorator();
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

                class Test4createClassDecorator {

                    public static value(@wrongTypedDecorator v: number): number { return v; }
                }
                new Test4createClassDecorator();
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
