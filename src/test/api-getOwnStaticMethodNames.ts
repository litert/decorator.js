import * as $Assert from 'assert';
import $Decorators from '../lib';
import 'reflect-metadata';

describe('api:getOwnStaticMethodNames', function() {

    const mark = $Decorators.createStaticMethodDecorator(function() {});
    const gMark = $Decorators.createGeneralDecorator({ staticMethod() {}, method() {} });

    it('should get static methods decorated by decorator.js only', function() {

        class A {

            @mark
            public static a(): string { return '321'; }

            public static b(): string { return '321'; }

            @mark
            public static c(): number { return 321; }

            @gMark
            public d(): number { return 123; };

        }

        $Assert.strictEqual($Decorators.getOwnStaticMethodNames(A).sort().join(','), 'a,c');
    });
    it('should get all decorated methods when hook of "reflect-metadata" on', function() {

        $Decorators.hookNativeReflectMetadata();

        class A {

            @mark
            public static a(): string { return '321'; }

            @Reflect.metadata('ffff', 'test')
            public static b(): string { return '321'; }

            @mark
            public static c(): number { return 321; }

        }


        $Assert.strictEqual($Decorators.getOwnStaticMethodNames(A).sort().join(','), 'a,b,c');

        $Decorators.hookNativeReflectMetadata(false);
    });

    it('should get methods decorated by decorator.js only while using general decorator', function() {

        class A {

            @gMark
            public static a(): string { return '321'; }

            @Reflect.metadata('ffff', 'test')
            public static b(): string { return '321'; }

            @gMark
            public static c(): number { return 321; }

        }


        $Assert.strictEqual($Decorators.getOwnStaticMethodNames(A).sort().join(','), 'a,c');
    });
});
