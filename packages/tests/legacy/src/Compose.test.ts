import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as Legacy from '@litert/decorator/legacy';

NodeTest.describe('[Legacy] Compose Decorators', () => {

    class Fixture {

        public method(): string { return 'method'; }

        public get getter(): string { return 'getter'; }

        public set setter(value: string) { void value; }

        public get accessor(): string { return 'accessor'; }

        public set accessor(value: string) { void value; }

        public static staticMethod(): string { return 'static-method'; }

        public static get staticGetter(): string { return 'static-getter'; }

        public static set staticSetter(value: string) { void value; }

        public static get staticAccessor(): string { return 'static-accessor'; }

        public static set staticAccessor(value: string) { void value; }
    }

    const METHOD_DESCRIPTOR: TypedPropertyDescriptor<any> = {
        'value': function () { return 'method'; },
    };

    const METHOD_REPLACEMENT_1: TypedPropertyDescriptor<any> = {
        'value': function () { return 'method-1'; },
    };

    const METHOD_REPLACEMENT_2: TypedPropertyDescriptor<any> = {
        'value': function () { return 'method-2'; },
    };

    const GETTER_DESCRIPTOR: TypedPropertyDescriptor<any> = {
        'get': function () { return 'getter'; },
    };

    const GETTER_REPLACEMENT_1: TypedPropertyDescriptor<any> = {
        'get': function () { return 'getter-1'; },
    };

    const GETTER_REPLACEMENT_2: TypedPropertyDescriptor<any> = {
        'get': function () { return 'getter-2'; },
    };

    const SETTER_DESCRIPTOR: TypedPropertyDescriptor<any> = {
        'set': function (value: string) { void value; },
    };

    const SETTER_REPLACEMENT_1: TypedPropertyDescriptor<any> = {
        'set': function (value: string) { void value; },
    };

    const SETTER_REPLACEMENT_2: TypedPropertyDescriptor<any> = {
        'set': function (value: string) { void value; },
    };

    const ACCESSOR_DESCRIPTOR: TypedPropertyDescriptor<any> = {
        'get': function () { return 'accessor'; },
        'set': function (value: string) { void value; },
    };

    NodeTest.it('compose should reject invalid decorator lists', () => {

        NodeAssert.throws(() => Legacy.Classes.compose([]), TypeError);
        NodeAssert.throws(() => Legacy.Classes.compose([null as any]), TypeError);
    });

    NodeTest.it('compose should reject invalid decorator arguments', () => {

        const cases: Array<[
            string,
            { compose: (decorators: any[]) => any },
            ErrorConstructor
        ]> = [
            ['class', Legacy.Classes, TypeError],
            ['accessor', Legacy.Accessors, TypeError],
            ['getter', Legacy.Getters, TypeError],
            ['setter', Legacy.Setters, TypeError],
            ['property', Legacy.Properties, TypeError],
            ['method', Legacy.Methods, TypeError],
            ['method-parameter', Legacy.MethodParameters, TypeError],
            ['constructor-parameter', Legacy.ConstructorParameters, TypeError],
            ['static-accessor', Legacy.StaticAccessors, TypeError],
            ['static-getter', Legacy.StaticGetters, TypeError],
            ['static-setter', Legacy.StaticSetters, TypeError],
            ['static-property', Legacy.StaticProperties, TypeError],
            ['static-method', Legacy.StaticMethods, TypeError],
            ['static-method-parameter', Legacy.StaticMethodParameters, TypeError],
            ['general', Legacy.GeneralDecorators, Error],
        ];

        for (const [name, decorators, errorCtor] of cases) {

            const decorator = decorators.compose([() => undefined]);

            NodeAssert.throws(
                () => decorator(Fixture.prototype, 'invalid', null),
                errorCtor,
                `Case "${name}" should reject invalid arguments.`,
            );
        }
    });

    NodeTest.it('compose should pass class replacements to following decorators', () => {

        class Replacement1 {}
        class Replacement2 {}

        const calls: string[] = [];
        const decorator = Legacy.Classes.compose([
            (ctor: any) => {

                calls.push(ctor === Fixture ? 'first:original' : 'first:other');
                return Replacement1;
            },
            (ctor: any) => {

                calls.push(ctor === Replacement1 ? 'second:replacement' : 'second:other');
                return Replacement2;
            },
        ] as any);

        NodeAssert.strictEqual(decorator(Fixture), Replacement2);
        NodeAssert.deepStrictEqual(calls, ['first:original', 'second:replacement']);
    });

    NodeTest.it('compose should pass getter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture.prototype, 'getter', GETTER_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Legacy.Getters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === GETTER_DESCRIPTOR ? 'getter:first:original' : 'getter:first:other');
                return GETTER_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === GETTER_REPLACEMENT_1 ? 'getter:second:replacement' : 'getter:second:other');
                return GETTER_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), GETTER_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'getter:first:original',
            'getter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass setter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture.prototype, 'setter', SETTER_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Legacy.Setters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === SETTER_DESCRIPTOR ? 'setter:first:original' : 'setter:first:other');
                return SETTER_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === SETTER_REPLACEMENT_1 ? 'setter:second:replacement' : 'setter:second:other');
                return SETTER_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), SETTER_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'setter:first:original',
            'setter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass method descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture.prototype, 'method', METHOD_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Legacy.Methods as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === METHOD_DESCRIPTOR ? 'method:first:original' : 'method:first:other');
                return METHOD_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === METHOD_REPLACEMENT_1 ? 'method:second:replacement' : 'method:second:other');
                return METHOD_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), METHOD_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'method:first:original',
            'method:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-getter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture, 'staticGetter', GETTER_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Legacy.StaticGetters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === GETTER_DESCRIPTOR ? 'static-getter:first:original' : 'static-getter:first:other');
                return GETTER_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === GETTER_REPLACEMENT_1 ? 'static-getter:second:replacement' : 'static-getter:second:other');
                return GETTER_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), GETTER_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'static-getter:first:original',
            'static-getter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-setter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture, 'staticSetter', SETTER_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Legacy.StaticSetters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === SETTER_DESCRIPTOR ? 'static-setter:first:original' : 'static-setter:first:other');
                return SETTER_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === SETTER_REPLACEMENT_1 ? 'static-setter:second:replacement' : 'static-setter:second:other');
                return SETTER_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), SETTER_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'static-setter:first:original',
            'static-setter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-method descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture, 'staticMethod', METHOD_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Legacy.StaticMethods as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === METHOD_DESCRIPTOR ? 'static-method:first:original' : 'static-method:first:other');
                return METHOD_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === METHOD_REPLACEMENT_1 ? 'static-method:second:replacement' : 'static-method:second:other');
                return METHOD_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), METHOD_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'static-method:first:original',
            'static-method:second:replacement',
        ]);
    });

    NodeTest.it('compose should apply non-replacement decorators for accessors in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.Accessors as any).compose([
            () => { calls.push('accessor:first'); },
            () => { calls.push('accessor:second'); },
        ]);

        const result = decorator(Fixture.prototype, 'accessor', ACCESSOR_DESCRIPTOR);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['accessor:first', 'accessor:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for properties in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.Properties as any).compose([
            () => { calls.push('property:first'); },
            () => { calls.push('property:second'); },
        ]);

        const result = decorator(Fixture.prototype, 'property', undefined);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['property:first', 'property:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for method parameters in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.MethodParameters as any).compose([
            () => { calls.push('method-parameter:first'); },
            () => { calls.push('method-parameter:second'); },
        ]);

        const result = decorator(Fixture.prototype, 'method', 0);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['method-parameter:first', 'method-parameter:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for constructor parameters in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.ConstructorParameters as any).compose([
            () => { calls.push('constructor-parameter:first'); },
            () => { calls.push('constructor-parameter:second'); },
        ]);

        const result = decorator(Fixture, undefined, 0);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['constructor-parameter:first', 'constructor-parameter:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for static accessors in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.StaticAccessors as any).compose([
            () => { calls.push('static-accessor:first'); },
            () => { calls.push('static-accessor:second'); },
        ]);

        const result = decorator(Fixture, 'staticAccessor', ACCESSOR_DESCRIPTOR);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['static-accessor:first', 'static-accessor:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for static properties in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.StaticProperties as any).compose([
            () => { calls.push('static-property:first'); },
            () => { calls.push('static-property:second'); },
        ]);

        const result = decorator(Fixture, 'staticProperty', undefined);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['static-property:first', 'static-property:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for static method parameters in order', () => {

        const calls: string[] = [];
        const decorator = (Legacy.StaticMethodParameters as any).compose([
            () => { calls.push('static-method-parameter:first'); },
            () => { calls.push('static-method-parameter:second'); },
        ]);

        const result = decorator(Fixture, 'staticMethod', 0);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['static-method-parameter:first', 'static-method-parameter:second']);
    });

    NodeTest.it('compose should dispatch general decorators by legacy target type', () => {

        const calls: string[] = [];
        const decorator = Legacy.GeneralDecorators.compose([
            (...args: any[]) => {

                calls.push(Legacy.Methods.validateArgs(args) ? 'first:method' : 'first:other');
                return METHOD_REPLACEMENT_1;
            },
            (...args: any[]) => {

                calls.push(args[2] === METHOD_REPLACEMENT_1 ? 'second:replacement' : 'second:other');
                return METHOD_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(
            decorator(Fixture.prototype, 'method', METHOD_DESCRIPTOR),
            METHOD_REPLACEMENT_2,
        );
        NodeAssert.deepStrictEqual(calls, ['first:method', 'second:replacement']);
    });

    NodeTest.it('compose should reject invalid decorator targets', () => {

        const decorator = Legacy.Classes.compose([() => undefined]);

        NodeAssert.throws(() => {

            (decorator as Legacy.GeneralDecorators.ICallbackFn)(
                Fixture.prototype,
                'method',
                METHOD_DESCRIPTOR,
            );
        }, TypeError);
    });
});
