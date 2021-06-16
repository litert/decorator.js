import * as $Assert from 'assert';
import $Decorators from '../lib';
import 'reflect-metadata';

describe('api:getOwnPropertyNames', function() {

    const mark = $Decorators.createPropertyDecorator(function() {});
    const gMark = $Decorators.createGeneralDecorator({ property() {}, staticProperty() {} });

    it('should get non-static properties decorated by decorator.js only', function() {

        class A {

            @mark
            public a!: string;

            public b!: string;

            @mark
            public c!: string;

            @gMark
            public static d: string;
        }

        $Assert.strictEqual($Decorators.getOwnPropertyNames(A).sort().join(','), 'a,c');
    });

    it('should get all decorated properties when hook of "reflect-metadata" on', function() {

        $Decorators.hookNativeReflectMetadata();

        class A {

            @mark
            public a!: string;

            @Reflect.metadata('ffff', 'test')
            public b!: string;

            @mark
            public c!: string;
        }

        $Assert.strictEqual($Decorators.getOwnPropertyNames(A).sort().join(','), 'a,b,c');

        $Decorators.hookNativeReflectMetadata(false);
    });

    it('should get properties decorated by decorator.js only while using general decorator', function() {

        class A {

            @gMark
            public a!: string;

            @Reflect.metadata('ffff', 'test')
            public b!: string;

            @gMark
            public c!: string;
        }

        $Assert.strictEqual($Decorators.getOwnPropertyNames(A).sort().join(','), 'a,c');
    });
});
