import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { Accessors, EContextType, GeneralDecorators } from '@litert/decorator/legacy';
import { IDict } from '@litert/utils-ts-types';

NodeTest.describe('[Legacy] Accessor Decorators', () => {

    let result: IDict<boolean> = {};

    function testGeneral(pos: string): GeneralDecorators.ICallbackFn {
        return function (...args: any[]) {
            result[pos] = Accessors.validateArgs(args);
        };
    }

    function testDedicated(): Accessors.ICallbackFn {
        return function () { return; }
    }

    NodeTest.it('validateArgs should reject null descriptor arguments', () => {

        class MyClass {}

        NodeAssert.strictEqual(
            Accessors.validateArgs([MyClass.prototype, 'value', null]),
            false,
        );
    });

    NodeTest.it('validateArgs should not pass insides class decorators', () => {

        @testGeneral('class')
        class MyClass {}

        void MyClass;

        NodeAssert.strictEqual(result['class'], false);
    });

    NodeTest.it('validateArgs should not pass insides member method decorators', () => {

        const symPublicMemberMethod = Symbol('public_member_method_symbol');
        const symProtectedMemberMethod = Symbol('protected_member_method_symbol');
        const symPrivateMemberMethod = Symbol('private_member_method_symbol');

        class MyClass {

            @testGeneral('public_member_method_string')
            public publicMethod() { this._privateMethod(); }

            @testGeneral('protected_member_method_string')
            protected _protectedMethod() { return; }

            @testGeneral('private_member_method_string')
            private _privateMethod(): void { return; }

            @testGeneral('public_member_method_symbol')
            public [symPublicMemberMethod](): void { this[symPrivateMemberMethod](); }

            @testGeneral('protected_member_method_symbol')
            protected [symProtectedMemberMethod](): void { return; }

            @testGeneral('private_member_method_symbol')
            private [symPrivateMemberMethod](): void { return; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {

                const key = `${access}_member_method_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member method parameter decorators', () => {

        const symPublicMemberMethod = Symbol('public_member_method_symbol');
        const symProtectedMemberMethod = Symbol('protected_member_method_symbol');
        const symPrivateMemberMethod = Symbol('private_member_method_symbol');

        class MyClass {

            public publicMethod(
                @testGeneral('public_member_method_parameter_string')
                v: string
            ) { this._privateMethod(v); }

            protected _protectedMethod(
                @testGeneral('protected_member_method_parameter_string')
                v: string
            ) { return v; }

            private _privateMethod(
                @testGeneral('private_member_method_parameter_string')
                v: string
            ): void { void v; }

            public [symPublicMemberMethod](
                v: string
            ): void { this[symPrivateMemberMethod](v); }

            protected [symProtectedMemberMethod](
                v: string
            ): string { return v; }

            private [symPrivateMemberMethod](
                v: string
            ): void { void v; }
        }

        (testGeneral('public_member_method_parameter_symbol') as any)(
            MyClass.prototype,
            symPublicMemberMethod,
            0
        );
        (testGeneral('protected_member_method_parameter_symbol') as any)(
            MyClass.prototype,
            symProtectedMemberMethod,
            0
        );
        (testGeneral('private_member_method_parameter_symbol') as any)(
            MyClass.prototype,
            symPrivateMemberMethod,
            0
        );

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {

                const key = `${access}_member_method_parameter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member getter decorators', () => {

        const symPub = Symbol('public_getter_symbol');
        const symPriv = Symbol('private_getter_symbol');
        const symProt = Symbol('protected_getter_symbol');

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
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member setter decorators', () => {

        const symPub = Symbol('public_setter_symbol');
        const symPriv = Symbol('private_setter_symbol');
        const symProt = Symbol('protected_setter_symbol');

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
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should pass insides member accessor decorators', () => {

        const symPub = Symbol('public_member_accessor_symbol');
        const symPriv = Symbol('private_member_accessor_symbol');
        const symProt = Symbol('protected_member_accessor_symbol');

        class MyClass {

            @testGeneral('public_member_accessor_string')
            @testDedicated()
            public get a(): string { return '123'; }
            public set a(v: string) { void v; }

            @testGeneral('protected_member_accessor_string')
            @testDedicated()
            protected get b(): string { return '123'; }
            protected set b(v: string) { void v; }

            @testGeneral('private_member_accessor_string')
            @testDedicated()
            private get c(): string { return '123'; }
            private set c(v: string) { void v; }

            @testGeneral('public_member_accessor_symbol')
            @testDedicated()
            public get [symPub](): string { return '123'; }
            public set [symPub](v: string) { void v; }

            @testGeneral('protected_member_accessor_symbol')
            @testDedicated()
            protected get [symProt](): string { return '123'; }
            protected set [symProt](v: string) { void v; }

            @testGeneral('private_member_accessor_symbol')
            @testDedicated()
            private get [symPriv](): string { return '123'; }
            private set [symPriv](v: string) { void v; }

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
                    true,
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides member property decorators', () => {

        const symPub = Symbol('public_member_property_symbol');
        const symPriv = Symbol('private_member_property_symbol');
        const symProt = Symbol('protected_member_property_symbol');

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
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides static method decorators', () => {

        const symPub = Symbol('public_static_method_symbol');
        const symPriv = Symbol('private_static_method_symbol');
        const symProt = Symbol('protected_static_method_symbol');

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
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides static method parameter decorators', () => {

        const symPub = Symbol('public_static_method_symbol');
        const symPriv = Symbol('private_static_method_symbol');
        const symProt = Symbol('protected_static_method_symbol');

        class MyClass {

            public static a(
                @testGeneral('public_static_method_parameter_string')
                v: string
            ) { MyClass._b(v); }

            private static _b(
                @testGeneral('private_static_method_parameter_string')
                v: string
            ) { void v; }

            protected static _c(
                @testGeneral('protected_static_method_parameter_string')
                v: string
            ) { return v; }

            public static [symPub](
                v: string
            ) { MyClass[symPriv](v); }

            private static [symPriv](
                v: string
            ) { void v; }

            protected static [symProt](
                v: string
            ) { return v; }
        }

        (testGeneral('public_static_method_parameter_symbol') as any)(
            MyClass,
            symPub,
            0
        );
        (testGeneral('private_static_method_parameter_symbol') as any)(
            MyClass,
            symPriv,
            0
        );
        (testGeneral('protected_static_method_parameter_symbol') as any)(
            MyClass,
            symProt,
            0
        );

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_method_parameter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    false,
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('validateArgs should not pass insides constructor parameter decorators', () => {

        class MyClass {

            public constructor(
                @testGeneral('constructor_parameter_0')
                public a: string,
                @testGeneral('constructor_parameter_1')
                protected b: string,
                @testGeneral('constructor_parameter_2')
                private c: string,
            ) {}

            public usePrivates() { void this.b; void this.c; }
        }

        void MyClass;

        for (const key of [
            'constructor_parameter_0',
            'constructor_parameter_1',
            'constructor_parameter_2',
        ]) {
            NodeAssert.strictEqual(
                result[key],
                false,
                `Case "" got `
            );
        }
    });

    NodeTest.it('validateArgs should not pass insides static property decorators', () => {

        const symPub = Symbol('public_static_property_symbol');
        const subPriv = Symbol('private_static_property_symbol');
        const symProt = Symbol('protected_static_property_symbol');

        class MyClass {

            @testGeneral('public_static_property_string')
            public static a: any;

            @testGeneral('private_static_property_string')
            private static _b: any;

            @testGeneral('protected_static_property_string')
            protected static _c: any;

            @testGeneral('public_static_property_symbol')
            public static [symPub]: any;

            @testGeneral('private_static_property_symbol')
            private static [subPriv]: any;

            @testGeneral('protected_static_property_symbol')
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
                    false,
                    `Case "" got `
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
                    `Case "" got `
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
                    `Case "" got `
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
                    `Case "" got `
                );
            }
        }
    });

    NodeTest.it('decorators created by withArgsCheck should allows decorating member accessors', () => {

        const testDedicate = Accessors.withArgsCheck(function (proto, propName, descriptor) {
            void proto;
            void propName;
            void descriptor;
         });

        NodeAssert.doesNotThrow(() => {

            class MyClass {

                private _value: string = '123';

                @testDedicate
                public get value(): string { return this._value; }
                public set value(v: string) { this._value = v; }
            }
            void MyClass;
        });
    });

    NodeTest.it('decorators created by withArgsCheck should not allow decorating non-accessor elements', () => {

        const testDedicate = Accessors.withArgsCheck(function (proto, propName, descriptor) {
            void proto;
            void propName;
            void descriptor;
         });

        NodeAssert.throws(() => {

            @(testDedicate as GeneralDecorators.ICallbackFn)
            class test {

                public prop: any;
            }
            void test;
        }, TypeError);
    });

    NodeTest.it('decorators created by create should allows decorating member accessors', () => {

        let ctx: Accessors.IContext | null = null;
        let descriptor: PropertyDescriptor | undefined;
        const testDedicate = Accessors.create(function (value) {

            ctx = value;
        });

        NodeAssert.doesNotThrow(() => {

            class MyClass {

                private _value: string = '123';

                @testDedicate
                public get value(): string { return this._value; }
                public set value(v: string) { this._value = v; }
            }
            descriptor = Object.getOwnPropertyDescriptor(
                MyClass.prototype,
                'value'
            );
            void MyClass;
        });

        const actual = ctx as unknown as Accessors.IContext;
        NodeAssert.ok(actual);
        NodeAssert.ok(descriptor);
        NodeAssert.strictEqual(actual.type, EContextType.ACCESSOR);
        NodeAssert.strictEqual(actual.constructor, actual.prototype.constructor);
        NodeAssert.strictEqual(actual.accessorName, 'value');
        NodeAssert.strictEqual(actual.descriptor.get, descriptor.get);
        NodeAssert.strictEqual(actual.descriptor.set, descriptor.set);
    });

    NodeTest.it('decorators created by create should not allow decorating non-accessor elements', () => {

        const testDedicate = Accessors.create(function (ctx) {

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
