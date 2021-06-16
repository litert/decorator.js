import * as $Assert from 'assert';
import $Decorators from '../lib';
import 'reflect-metadata';

describe('api:getOwnStaticPropertyNames', function() {

    const mark = $Decorators.createStaticPropertyDecorator(function() {});
    const gMark = $Decorators.createGeneralDecorator({ staticProperty() {}, property() {} });

    it('should get static properties decorated by decorator.js only', function() {

        class A {

            @mark
            public static a: string;

            public static b: string;

            @mark
            public static c: string;

            @gMark
            public d!: string;
        }

        $Assert.strictEqual($Decorators.getOwnStaticPropertyNames(A).sort().join(','), 'a,c');
    });

    it('should get all decorated properties when hook of "reflect-metadata" on', function() {

        $Decorators.hookNativeReflectMetadata();

        class A {

            @mark
            public static a: string;

            @Reflect.metadata('ffff', 'test')
            public static b: string;

            @mark
            public static c: string;
        }

        $Assert.strictEqual($Decorators.getOwnStaticPropertyNames(A).sort().join(','), 'a,b,c');

        $Decorators.hookNativeReflectMetadata(false);
    });

    it('should get properties decorated by decorator.js only while using general decorator', function() {

        class A {

            @gMark
            public static a: string;

            @Reflect.metadata('ffff', 'test')
            public static b: string;

            @gMark
            public static c: string;
        }

        $Assert.strictEqual($Decorators.getOwnStaticPropertyNames(A).sort().join(','), 'a,c');
    });
});
