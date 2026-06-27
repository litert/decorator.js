import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { StaticProperties, GeneralDecorators } from '@litert/decorator';
import { IDict } from '@litert/utils-ts-types';

NodeTest.describe('[Modern] Static Property Decorators', () => {

    let result: IDict<boolean> = {};

    function testGeneral(pos: string): GeneralDecorators.ICallbackFn {
        return function (...args: any[]) {
            result[pos] = StaticProperties.validateArgs(args);
        };
    }

    function testDedicated(): StaticProperties.ICallbackFn {
        return function () { return; }
    }

    NodeTest.it('validateArgs should not pass insides class decorators', () => {

        @testGeneral('class')
        class MyClass {}

        void MyClass;

        NodeAssert.strictEqual(result['class'], false);
    });

    NodeTest.it('validateArgs should not pass insides member method decorators', () => {

        const symPub = Symbol('public_member_method_symbol');
        const symProt = Symbol('protected_member_method_symbol');
        const symPriv = Symbol('private_member_method_symbol');

        class MyClass {

            @testGeneral('public_member_method_string')
            public publicMethod() { this._privateMethod(); }

            @testGeneral('protected_member_method_string')
            protected _protectedMethod() { return; }

            @testGeneral('private_member_method_string')
            private _privateMethod(): void { return; }

            @testGeneral('public_member_method_symbol')
            public [symPub](): void { this[symPriv](); }

            @testGeneral('protected_member_method_symbol')
            protected [symProt](): void { return; }

            @testGeneral('private_member_method_symbol')
            private [symPriv](): void { return; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_method_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member getter decorators', () => {

        const symPub = Symbol('public_getter_symbol');
        const symProt = Symbol('protected_getter_symbol');
        const symPriv = Symbol('private_getter_symbol');

        class MyClass {

            @testGeneral('public_member_getter_string')
            public get a(): string { return this._b; }

            @testGeneral('protected_member_getter_string')
            protected get b(): string { return '123'; }

            @testGeneral('private_member_getter_string')
            private get _b(): string { return '123'; }

            @testGeneral('public_member_getter_symbol')
            public get [symPub](): string { return this[symPriv]; }

            @testGeneral('protected_member_getter_symbol')
            protected get [symProt](): string { return '123'; }

            @testGeneral('private_member_getter_symbol')
            private get [symPriv](): string { return '123'; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_getter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member setter decorators', () => {

        const symPub = Symbol('public_setter_symbol');
        const symProt = Symbol('protected_setter_symbol');
        const symPriv = Symbol('private_setter_symbol');

        class MyClass {

            @testGeneral('public_member_setter_string')
            public set a(v: string) { this.c = v; }

            @testGeneral('protected_member_setter_string')
            protected set b(v: string) { void v; }

            @testGeneral('private_member_setter_string')
            private set c(v: string) { void v; }

            @testGeneral('public_member_setter_symbol')
            public set [symPub](v: string) { this[symPriv] = v; }

            @testGeneral('protected_member_setter_symbol')
            protected set [symProt](v: string) { void v; }

            @testGeneral('private_member_setter_symbol')
            private set [symPriv](v: string) { void v; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_setter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member accessor decorators', () => {

        const symPub = Symbol('public_member_accessor_symbol');
        const symProt = Symbol('protected_member_accessor_symbol');
        const symPriv = Symbol('private_member_accessor_symbol');

        class MyClass {

            @testGeneral('public_member_accessor_string')
            public accessor a: string = '123';

            @testGeneral('protected_member_accessor_string')
            protected accessor b: string = '123';

            @testGeneral('private_member_accessor_string')
            private accessor c: string = '123';

            @testGeneral('public_member_accessor_symbol')
            public accessor [symPub]: string = '123';

            @testGeneral('protected_member_accessor_symbol')
            protected accessor [symProt]: string = '123';

            @testGeneral('private_member_accessor_symbol')
            private accessor [symPriv]: string = '123';

            public usePrivates() {
                void this.c;
                void this[symPriv];
            }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_accessor_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member property decorators', () => {

        const symPub = Symbol('public_member_property_symbol');
        const symProt = Symbol('protected_member_property_symbol');
        const symPriv = Symbol('private_member_property_symbol');

        class MyClass {

            @testGeneral('public_member_property_string')
            public a: any;

            @testGeneral('private_member_property_string')
            private _b: any;

            @testGeneral('protected_member_property_string')
            protected _c: any;

            @testGeneral('public_member_property_symbol')
            public [symPub]: any;

            @testGeneral('private_member_property_symbol')
            private [symPriv]: any;

            @testGeneral('protected_member_property_symbol')
            protected [symProt]: any;

            public usePrivates() { void this._b; void this[symPriv]; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_property_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides static method decorators', () => {

        const symPub = Symbol('public_static_method_symbol');
        const symProt = Symbol('protected_static_method_symbol');
        const symPriv = Symbol('private_static_method_symbol');

        class MyClass {

            @testGeneral('public_static_method_string')
            public static a() { MyClass._b(); }

            @testGeneral('private_static_method_string')
            private static _b() { return; }

            @testGeneral('protected_static_method_string')
            protected static _c() { return; }

            @testGeneral('public_static_method_symbol')
            public static [symPub]() { MyClass[symPriv](); }

            @testGeneral('private_static_method_symbol')
            private static [symPriv]() { return; }

            @testGeneral('protected_static_method_symbol')
            protected static [symProt]() { return; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_method_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should pass insides static property decorators', () => {

        const symPub = Symbol('public_static_property_symbol');
        const subPriv = Symbol('private_static_property_symbol');
        const symProt = Symbol('protected_static_property_symbol');

        class MyClass {

            @testGeneral('public_static_property_string')
            @testDedicated()
            public static a: any;

            @testGeneral('private_static_property_string')
            @testDedicated()
            private static _b: any;

            @testGeneral('protected_static_property_string')
            @testDedicated()
            protected static _c: any;

            @testGeneral('public_static_property_symbol')
            @testDedicated()
            public static [symPub]: any;

            @testGeneral('private_static_property_symbol')
            @testDedicated()
            private static [subPriv]: any;

            @testGeneral('protected_static_property_symbol')
            @testDedicated()
            protected static [symProt]: any;

            public static usePrivates() {
                void MyClass._b;
                void MyClass[subPriv];
            }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_property_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides static getter decorators', () => {

        const symPub = Symbol('public_static_getter_symbol');
        const symProt = Symbol('protected_static_getter_symbol');
        const symPriv = Symbol('private_static_getter_symbol');

        class MyClass {

            @testGeneral('public_static_getter_string')
            public static get a1(): string { return this._a2; }

            @testGeneral('private_static_getter_string')
            private static get _a2(): string { return '123'; }

            @testGeneral('protected_static_getter_string')
            protected static get _a3(): string { return '123'; }

            @testGeneral('public_static_getter_symbol')
            public static get [symPub](): string { return this[symPriv]; }

            @testGeneral('protected_static_getter_symbol')
            protected static get [symProt](): string { return '123'; }

            @testGeneral('private_static_getter_symbol')
            private static get [symPriv](): string { return '123'; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_getter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides static setter decorators', () => {

        const symPub = Symbol('public_static_setter_symbol');
        const symProt = Symbol('protected_static_setter_symbol');
        const symPriv = Symbol('private_static_setter_symbol');

        class MyClass {

            @testGeneral('public_static_setter_string')
            public static set a1(v: string) { this._a2 = v; }

            @testGeneral('private_static_setter_string')
            private static set _a2(v: string) { void v; }

            @testGeneral('protected_static_setter_string')
            protected static set _a3(v: string) { void v; }

            @testGeneral('public_static_setter_symbol')
            public static set [symPub](v: string) { this[symPriv] = v; }

            @testGeneral('protected_static_setter_symbol')
            protected static set [symProt](v: string) { void v; }

            @testGeneral('private_static_setter_symbol')
            private static set [symPriv](v: string) { void v; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_setter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides static accessor decorators', () => {

        const symPub = Symbol('public_static_accessor_symbol');
        const symProt = Symbol('protected_static_accessor_symbol');
        const symPriv = Symbol('private_static_accessor_symbol');

        class MyClass {

            @testGeneral('public_static_accessor_string')
            public static accessor a1: string;
            @testGeneral('private_static_accessor_string')
            private static accessor _a2: string;
            @testGeneral('protected_static_accessor_string')
            protected static accessor _a3: string;

            @testGeneral('public_static_accessor_symbol')
            public static accessor [symPub]: string;

            @testGeneral('protected_static_accessor_symbol')
            protected static accessor [symProt]: string;

            @testGeneral('private_static_accessor_symbol')
            private static accessor [symPriv]: string;

            public static usePrivates() {
                void MyClass._a2;
                void MyClass[symPriv];
            }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_accessor_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "${key}" should be false but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('decorators created by withArgsCheck should allow decorating static properties', () => {

        const testDedicate = StaticProperties.withArgsCheck(function (ctx) {
            void ctx;
        });

        NodeAssert.doesNotThrow(() => {

            class MyClass {

                @testDedicate
                public static value: any;
            }
            void MyClass;
        });
    });

    NodeTest.it('decorators created by withArgsCheck should not allow decorating non-static-property elements', () => {

        const testDedicate = StaticProperties.withArgsCheck(function (ctx) {
            void ctx;
        });

        NodeAssert.throws(() => {

            @(testDedicate as GeneralDecorators.ICallbackFn)
            class test {

                public prop: any;
            }
            void test;
        }, TypeError);
    });
});
