import * as $Assert from 'assert';
import $Decorators from '../lib';
import 'reflect-metadata';

describe('api:getOwnMethodNames', function() {

    const mark = $Decorators.createMethodDecorator(function() {});
    const gMark = $Decorators.createGeneralDecorator({ method() {}, staticMethod() {} });

    it('should get non-static methods decorated by decorator.js only', function() {

        class A {

            @mark
            public a(): string { return '321'; }

            public b(): string { return '321'; }

            @mark
            public c(): number { return 321; }

            @gMark
            public static d(): number { return 321; }
        }

        $Assert.strictEqual($Decorators.getOwnMethodNames(A).sort().join(','), 'a,c');
    });
    it('should get all decorated methods when hook of "reflect-metadata" on', function() {

        $Decorators.hookNativeReflectMetadata();

        class A {

            @mark
            public a(): string { return '321'; }

            @Reflect.metadata('ffff', 'test')
            public b(): string { return '321'; }

            @mark
            public c(): number { return 321; }

        }


        $Assert.strictEqual($Decorators.getOwnMethodNames(A).sort().join(','), 'a,b,c');

        $Decorators.hookNativeReflectMetadata(false);
    });

    it('should get methods decorated by decorator.js only while using general decorator', function() {

        class A {

            @gMark
            public a(): string { return '321'; }

            @Reflect.metadata('ffff', 'test')
            public b(): string { return '321'; }

            @gMark
            public c(): number { return 321; }

        }


        $Assert.strictEqual($Decorators.getOwnMethodNames(A).sort().join(','), 'a,c');
    });
});
