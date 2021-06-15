import * as $Assert from 'assert';
import $Decorators, { IGeneralDecorator } from '../lib';
describe('Member Method Decorator', function() {
    describe('method:createMethodDecorator', function() {

        it('should invoke the processor callback', function() {

            let called = false;

            class Test4createMethodDecorator {
    
                @$Decorators.createMethodDecorator(function() {

                    called = true;
                })
                public value(): number { return 321; }
            }

            new Test4createMethodDecorator();

            $Assert.strictEqual(called, true);
        });

        it('should get the first parameter as a class prototype', function() {

            let isPrototype: boolean = false;

            class Test4createMethodDecorator {
                
                @$Decorators.createMethodDecorator(function(proto) {
                    isPrototype = $Decorators.isClassPrototype(proto);
                })
                public value(): number { return 321; }
            }

            new Test4createMethodDecorator();

            $Assert.strictEqual(isPrototype, true);
        });

        it('should get the second parameter as the decorated method name', function() {

            let propName: string = '';

            class Test4createMethodDecorator {
                
                @$Decorators.createMethodDecorator(function(proto, pName) {
                    propName = pName as string;
                })
                public m1(): number { return 321; }
            }

            new Test4createMethodDecorator();

            $Assert.strictEqual(propName, 'm1');
        });

        it('should get class prototype of the decorated class', function() {

            let expectClsName: string = '';

            class Test4createMethodDecoratorName {

                @$Decorators.createMethodDecorator(function(proto) {

                    expectClsName = proto.constructor.name;
                })
                public value(): number { return 321; }
            }

            new Test4createMethodDecoratorName();
            $Assert.strictEqual(expectClsName, 'Test4createMethodDecoratorName');
        });

        it('should call all the decorator processor callbacks', function() {

            let count = 1;

            class Test4createMethodDecorator {

                @$Decorators.createMethodDecorator(function() {

                    count *= 4;
                })
                @$Decorators.createMethodDecorator(function() {

                    count *= 3;
                })
                public value(): number { return 321; }
            }

            new Test4createMethodDecorator();
            $Assert.strictEqual(count, 12);
        });

        describe('should throw TypeError if decorating wrong position', function() {

            const wrongTypedDecorator = $Decorators.createMethodDecorator(function() {

                return;

            }) as IGeneralDecorator;

            it('constructor parameter', function() {

                try {

                    class Test4createMethodDecorator {

                        public value: number;
    
                        public constructor(@wrongTypedDecorator v: number) { this.value = v; }
                    }
                    new Test4createMethodDecorator(321);
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
                    class Test4createMethodDecorator {}
                    new Test4createMethodDecorator();
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

                    class Test4createMethodDecorator {

                        @wrongTypedDecorator
                        public v: number = 321;
                    }
                    new Test4createMethodDecorator();
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

                    class Test4createMethodDecorator {

                        @wrongTypedDecorator
                        public static value: number = 123;
                    }
                    new Test4createMethodDecorator();
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

                    class Test4createMethodDecorator {

                        @wrongTypedDecorator
                        public static value(): number { return 321; }
                    }
                    new Test4createMethodDecorator();
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

                    class Test4createMethodDecorator {

                        public value(@wrongTypedDecorator v: number): number { return v; }
                    }
                    new Test4createMethodDecorator();
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

                    class Test4createMethodDecorator {

                        public static value(@wrongTypedDecorator v: number): number { return v; }
                    }
                    new Test4createMethodDecorator();
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
});
