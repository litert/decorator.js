import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { GeneralDecorators } from '@litert/decorator';
import { IDict } from '@litert/utils-ts-types';

NodeTest.describe('[Modern] General Decorators', () => {

    let result: IDict<boolean> = {};

    function testFullFeatured(pos: string): GeneralDecorators.ICallbackFn {

        return GeneralDecorators.create({
            'onClass': () => { result[pos] = true; },
            'onAccessor': () => { result[pos] = true; },
            'onGetter': () => { result[pos] = true; },
            'onMethod': () => { result[pos] = true; },
            'onProperty': () => { result[pos] = true; },
            'onSetter': () => { result[pos] = true; },
            'onStaticAccessor': () => { result[pos] = true; },
            'onStaticGetter': () => { result[pos] = true; },
            'onStaticMethod': () => { result[pos] = true; },
            'onStaticProperty': () => { result[pos] = true; },
            'onStaticSetter': () => { result[pos] = true; },
        });
    }

    NodeTest.it('full-featured decorators should work on class', () => {

        @testFullFeatured('class')
        class MyClass {}

        void MyClass;

        NodeAssert.strictEqual(result['class'], true);
    });

    NodeTest.it('full-featured decorators should work on member method', () => {

        const symPublicMemberMethod = Symbol('public_member_method_symbol');
        const symProtectedMemberMethod = Symbol('protected_member_method_symbol');
        const symPrivateMemberMethod = Symbol('private_member_method_symbol');

        class MyClass {

            @testFullFeatured('public_member_method_string')
            public publicMethod() { this._privateMethod(); }

            @testFullFeatured('protected_member_method_string')
            protected _protectedMethod() { return; }

            @testFullFeatured('private_member_method_string')
            private _privateMethod(): void { return; }

            @testFullFeatured('public_member_method_symbol')
            public [symPublicMemberMethod](): void { this[symPrivateMemberMethod](); }

            @testFullFeatured('protected_member_method_symbol')
            protected [symProtectedMemberMethod](): void { return; }

            @testFullFeatured('private_member_method_symbol')
            private [symPrivateMemberMethod](): void { return; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {

                const key = `${access}_member_method_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on member getter', () => {

        const symPub = Symbol('public_getter_symbol');
        const symPriv = Symbol('private_getter_symbol');
        const symProt = Symbol('protected_getter_symbol');

        class MyClass {

            @testFullFeatured('public_member_getter_string')
            public get a(): string { return this._b; }

            @testFullFeatured('protected_member_getter_string')
            protected get b(): string { return '123'; }

            @testFullFeatured('private_member_getter_string')
            private get _b(): string { return '123'; }

            @testFullFeatured('public_member_getter_symbol')
            public get [symPub](): string { return this[symPriv]; }

            @testFullFeatured('protected_member_getter_symbol')
            protected get [symProt](): string { return '123'; }

            @testFullFeatured('private_member_getter_symbol')
            private get [symPriv](): string { return '123'; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_getter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on member setter', () => {

        const symPub = Symbol('public_setter_symbol');
        const symPriv = Symbol('private_setter_symbol');
        const symProt = Symbol('protected_setter_symbol');

        class MyClass {

            @testFullFeatured('public_member_setter_string')
            public set a(v: string) { this.c = v; }

            @testFullFeatured('protected_member_setter_string')
            protected set b(v: string) { void v; }

            @testFullFeatured('private_member_setter_string')
            private set c(v: string) { void v; }

            @testFullFeatured('public_member_setter_symbol')
            public set [symPub](v: string) { this[symPriv] = v; }

            @testFullFeatured('protected_member_setter_symbol')
            protected set [symProt](v: string) { void v; }

            @testFullFeatured('private_member_setter_symbol')
            private set [symPriv](v: string) { void v; }
        }

        void MyClass;

        for (const access of ['public', 'protected', 'private']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_setter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on member accessor', () => {

        const symPub = Symbol('public_member_accessor_symbol');
        const symPriv = Symbol('private_member_accessor_symbol');
        const symProt = Symbol('protected_member_accessor_symbol');

        class MyClass {

            @testFullFeatured('public_member_accessor_string')
            public accessor a: string = '123';

            @testFullFeatured('protected_member_accessor_string')
            protected accessor b: string = '123';

            @testFullFeatured('private_member_accessor_string')
            private accessor c: string = '123';

            @testFullFeatured('public_member_accessor_symbol')
            public accessor [symPub]: string = '123';

            @testFullFeatured('protected_member_accessor_symbol')
            protected accessor [symProt]: string = '123';

            @testFullFeatured('private_member_accessor_symbol')
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
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on member property', () => {

        const symPub = Symbol('public_member_property_symbol');
        const symPriv = Symbol('private_member_property_symbol');
        const symProt = Symbol('protected_member_property_symbol');

        class MyClass {

            @testFullFeatured('public_member_property_string')
            public a: any;

            @testFullFeatured('private_member_property_string')
            private _b: any;

            @testFullFeatured('protected_member_property_string')
            protected _c: any;

            @testFullFeatured('public_member_property_symbol')
            public [symPub]: any;

            @testFullFeatured('private_member_property_symbol')
            private [symPriv]: any;

            @testFullFeatured('protected_member_property_symbol')
            protected [symProt]: any;

            public usePrivates() { void this._b; void this[symPriv]; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_member_property_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on static method', () => {

        const symPub = Symbol('public_static_method_symbol');
        const symPriv = Symbol('private_static_method_symbol');
        const symProt = Symbol('protected_static_method_symbol');

        class MyClass {

            @testFullFeatured('public_static_method_string')
            public static a() { MyClass._b(); }

            @testFullFeatured('private_static_method_string')
            private static _b() { return; }

            @testFullFeatured('protected_static_method_string')
            protected static _c() { return; }

            @testFullFeatured('public_static_method_symbol')
            public static [symPub]() { MyClass[symPriv](); }

            @testFullFeatured('private_static_method_symbol')
            private static [symPriv]() { return; }

            @testFullFeatured('protected_static_method_symbol')
            protected static [symProt]() { return; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_method_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on static property', () => {

        const symPub = Symbol('public_static_property_symbol');
        const subPriv = Symbol('private_static_property_symbol');
        const symProt = Symbol('protected_static_property_symbol');

        class MyClass {

            @testFullFeatured('public_static_property_string')
            public static a: any;

            @testFullFeatured('private_static_property_string')
            private static _b: any;

            @testFullFeatured('protected_static_property_string')
            protected static _c: any;

            @testFullFeatured('public_static_property_symbol')
            public static [symPub]: any;

            @testFullFeatured('private_static_property_symbol')
            private static [subPriv]: any;

            @testFullFeatured('protected_static_property_symbol')
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

    NodeTest.it('full-featured decorators should work on static getter', () => {

        const symPub = Symbol('public_static_getter_symbol');
        const symProt = Symbol('protected_static_getter_symbol');
        const symPriv = Symbol('private_static_getter_symbol');

        class MyClass {

            @testFullFeatured('public_static_getter_string')
            public static get a1(): string { return this._a2; }
            
            @testFullFeatured('private_static_getter_string')
            private static get _a2(): string { return '123'; }

            @testFullFeatured('protected_static_getter_string')
            protected static get _a3(): string { return '123'; }

            @testFullFeatured('public_static_getter_symbol')
            public static get [symPub](): string { return this[symPriv]; }

            @testFullFeatured('protected_static_getter_symbol')
            protected static get [symProt](): string { return '123'; }

            @testFullFeatured('private_static_getter_symbol')
            private static get [symPriv](): string { return '123'; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_getter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on static setter', () => {

        const symPub = Symbol('public_static_setter_symbol');
        const symProt = Symbol('protected_static_setter_symbol');
        const symPriv = Symbol('private_static_setter_symbol');

        class MyClass {

            @testFullFeatured('public_static_setter_string')
            public static set a1(v: string) { this._a2 = v; }
            
            @testFullFeatured('private_static_setter_string')
            private static set _a2(v: string) { void v; }

            @testFullFeatured('protected_static_setter_string')
            protected static set _a3(v: string) { void v; }

            @testFullFeatured('public_static_setter_symbol')
            public static set [symPub](v: string) { this[symPriv] = v; }

            @testFullFeatured('protected_static_setter_symbol')
            protected static set [symProt](v: string) { void v; }

            @testFullFeatured('private_static_setter_symbol')
            private static set [symPriv](v: string) { void v; }
        }

        void MyClass;

        for (const access of ['public', 'private', 'protected']) {
            for (const type of ['string', 'symbol']) {
                const key = `${access}_static_setter_${type}`;
                NodeAssert.strictEqual(
                    result[key],
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('full-featured decorators should work on static accessor', () => {

        const symPub = Symbol('public_static_accessor_symbol');
        const symProt = Symbol('protected_static_accessor_symbol');
        const symPriv = Symbol('private_static_accessor_symbol');

        class MyClass {

            @testFullFeatured('public_static_accessor_string')
            public static accessor a1: string;
            @testFullFeatured('private_static_accessor_string')
            private static accessor _a2: string;
            @testFullFeatured('protected_static_accessor_string')
            protected static accessor _a3: string;

            @testFullFeatured('public_static_accessor_symbol')
            public static accessor [symPub]: string;

            @testFullFeatured('protected_static_accessor_symbol')
            protected static accessor [symProt]: string;

            @testFullFeatured('private_static_accessor_symbol')
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
                    true,
                    `Case "${key}" should be true but got ${result[key]}`
                );
            }
        }
    });

    NodeTest.it('creating general decorators without cases should emit errors', () => {

        NodeAssert.throws(() => GeneralDecorators.create({}), TypeError);
    });

    NodeTest.it('creating general decorators with non-function cases should emit errors', () => {

        NodeAssert.throws(() => GeneralDecorators.create({
            onAccessor: null as any,
        }), TypeError);
    });

    NodeTest.it('partial general decorators should only work on specified cases', () => {

        const result: Record<string, boolean> = {};
        function testPartialGeneral(pos: string): GeneralDecorators.ICallbackFn {

            return GeneralDecorators.create({
                'onClass': () => { result[pos] = true; },
                'onProperty': () => { result[pos] = true; },
                'onStaticAccessor': () => { result[pos] = true; },
                'onStaticMethod': () => { result[pos] = true; },
                'onStaticProperty': () => { result[pos] = true; },
            });
        }

        NodeAssert.doesNotThrow(() => {

            @testPartialGeneral('class')
            class MyClass {
                @testPartialGeneral('property')
                public v: string = '123';
                @testPartialGeneral('static_property')
                public static v1: string = '123';
                @testPartialGeneral('static_accessor')
                public static accessor s: number = 321;
                @testPartialGeneral('static_method')
                public static vvvv(): void {}
            }
            void MyClass;
        });

        NodeAssert.throws(() => {

            class MyClass {
                @testPartialGeneral('getter')
                public get v(): string { return '123'; }
            }
            void MyClass;
        }, Error);

        NodeAssert.throws(() => {

            class MyClass {
                @testPartialGeneral('setter')
                public set v(v: string) { void v; }
            }
            void MyClass;
        }, Error);

        NodeAssert.throws(() => {

            class MyClass {
                @testPartialGeneral('accessor')
                public accessor v: string = '123';
            }
            void MyClass;
        }, Error);

        NodeAssert.throws(() => {

            class MyClass {
                @testPartialGeneral('method')
                public v(v: string) { void v; }
            }
            void MyClass;
        }, Error);

        NodeAssert.throws(() => {

            class MyClass {
                @testPartialGeneral('static_getter')
                public static get v(): string { return '123'; }
            }
            void MyClass;
        }, Error);

        NodeAssert.throws(() => {

            class MyClass {
                @testPartialGeneral('static_setter')
                public static set v(v: string) { void v; }
            }
            void MyClass;
        }, Error);

        for (const c of ['class', 'property', 'static_property', 'static_accessor', 'static_method']) {
            NodeAssert.strictEqual(
                result[c],
                true,
                `Case "${c}" should be true but got ${result[c]}`
            );
        }

        for (const c of ['getter', 'setter', 'accessor', 'method', 'static_getter', 'static_setter']) {
            NodeAssert.strictEqual(
                result[c],
                undefined,
                `Case "${c}" should be undefined but got ${result[c]}`
            );
        }
    });
});
