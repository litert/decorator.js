import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as Compatible from '@litert/decorator/compatible';

NodeTest.describe('[Legacy] Compatible Compose Decorators', () => {

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

    const ACCESSOR_DESCRIPTOR: TypedPropertyDescriptor<any> = {
        'get': function () { return 'accessor'; },
        'set': function (value: string) { void value; },
    };

    const ACCESSOR_REPLACEMENT_1: TypedPropertyDescriptor<any> = {
        'get': function () { return 'accessor-1'; },
        'set': function (value: string) { void value; },
    };

    const ACCESSOR_REPLACEMENT_2: TypedPropertyDescriptor<any> = {
        'get': function () { return 'accessor-2'; },
        'set': function (value: string) { void value; },
    };

    NodeTest.it('compose should pass class replacements to following decorators', () => {

        class Replacement1 {}
        class Replacement2 {}

        const calls: string[] = [];
        const decorator = (Compatible.Classes as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[0] === Fixture ? 'class:first:original' : 'class:first:other');
                return Replacement1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[0] === Replacement1 ? 'class:second:replacement' : 'class:second:other');
                return Replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(Fixture), Replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'class:first:original',
            'class:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass getter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture.prototype, 'getter', { 'get': function () { return 'getter'; } }];

        const calls: string[] = [];
        const decorator = (Compatible.Getters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === args[2] ? 'getter:first:original' : 'getter:first:other');
                return ACCESSOR_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === ACCESSOR_REPLACEMENT_1 ? 'getter:second:replacement' : 'getter:second:other');
                return ACCESSOR_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), ACCESSOR_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'getter:first:original',
            'getter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass setter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture.prototype, 'setter', { 'set': function (value: string) { void value; } }];

        const calls: string[] = [];
        const decorator = (Compatible.Setters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === args[2] ? 'setter:first:original' : 'setter:first:other');
                return ACCESSOR_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === ACCESSOR_REPLACEMENT_1 ? 'setter:second:replacement' : 'setter:second:other');
                return ACCESSOR_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), ACCESSOR_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'setter:first:original',
            'setter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass method descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture.prototype, 'method', METHOD_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Compatible.Methods as any).compose([
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

        const args: any[] = [Fixture, 'staticGetter', { 'get': function () { return 'getter'; } }];

        const calls: string[] = [];
        const decorator = (Compatible.StaticGetters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === args[2] ? 'static-getter:first:original' : 'static-getter:first:other');
                return ACCESSOR_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === ACCESSOR_REPLACEMENT_1 ? 'static-getter:second:replacement' : 'static-getter:second:other');
                return ACCESSOR_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), ACCESSOR_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'static-getter:first:original',
            'static-getter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-setter descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture, 'staticSetter', { 'set': function (value: string) { void value; } }];

        const calls: string[] = [];
        const decorator = (Compatible.StaticSetters as any).compose([
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === args[2] ? 'static-setter:first:original' : 'static-setter:first:other');
                return ACCESSOR_REPLACEMENT_1;
            },
            (...actualArgs: any[]) => {

                calls.push(actualArgs[2] === ACCESSOR_REPLACEMENT_1 ? 'static-setter:second:replacement' : 'static-setter:second:other');
                return ACCESSOR_REPLACEMENT_2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), ACCESSOR_REPLACEMENT_2);
        NodeAssert.deepStrictEqual(calls, [
            'static-setter:first:original',
            'static-setter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-method descriptor replacements to following decorators', () => {

        const args: any[] = [Fixture, 'staticMethod', METHOD_DESCRIPTOR];

        const calls: string[] = [];
        const decorator = (Compatible.StaticMethods as any).compose([
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
        const decorator = (Compatible.Accessors as any).compose([
            () => { calls.push('accessor:first'); },
            () => { calls.push('accessor:second'); },
        ]);

        const result = decorator(Fixture.prototype, 'accessor', ACCESSOR_DESCRIPTOR);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['accessor:first', 'accessor:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for properties in order', () => {

        const calls: string[] = [];
        const decorator = (Compatible.Properties as any).compose([
            () => { calls.push('property:first'); },
            () => { calls.push('property:second'); },
        ]);

        const result = decorator(Fixture.prototype, 'property', undefined);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['property:first', 'property:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for static accessors in order', () => {

        const calls: string[] = [];
        const decorator = (Compatible.StaticAccessors as any).compose([
            () => { calls.push('static-accessor:first'); },
            () => { calls.push('static-accessor:second'); },
        ]);

        const result = decorator(Fixture, 'staticAccessor', ACCESSOR_DESCRIPTOR);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['static-accessor:first', 'static-accessor:second']);
    });

    NodeTest.it('compose should apply non-replacement decorators for static properties in order', () => {

        const calls: string[] = [];
        const decorator = (Compatible.StaticProperties as any).compose([
            () => { calls.push('static-property:first'); },
            () => { calls.push('static-property:second'); },
        ]);

        const result = decorator(Fixture, 'staticProperty', undefined);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['static-property:first', 'static-property:second']);
    });

    NodeTest.it('compose should dispatch compatible general decorators in legacy mode', () => {

        const calls: string[] = [];
        const decorator = Compatible.GeneralDecorators.compose([
            (...args: any[]) => {

                calls.push(args[2] === METHOD_DESCRIPTOR ? 'first:method' : 'first:other');
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
});
