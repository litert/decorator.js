import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as Compatible from '@litert/decorator/compatible';

NodeTest.describe('[Modern] Compatible Compose Decorators', () => {

    class Fixture {}

    function createContext(kind: string, staticValue: boolean = false): any {

        return {
            'kind': kind,
            'name': `${staticValue ? 'static' : 'member'}-${kind}`,
            'static': staticValue,
        };
    }

    function createOptions(): any {

        return {
            legacy(): void {

                return;
            },
            modern(): void {

                return;
            },
        };
    }

    NodeTest.it('create should reject invalid compatible options', () => {

        NodeAssert.throws(
            () => Compatible.Methods.create({
                ...createOptions(),
                'legacy': null,
            }),
            TypeError,
        );
        NodeAssert.throws(
            () => Compatible.Methods.create({
                ...createOptions(),
                'modern': null,
            }),
            TypeError,
        );
    });

    NodeTest.it('create should reject invalid decorator arguments', () => {

        const cases: Array<[string, { create: (opts: any) => any }]> = [
            ['class', Compatible.Classes],
            ['method', Compatible.Methods],
            ['property', Compatible.Properties],
            ['accessor', Compatible.Accessors],
            ['getter', Compatible.Getters],
            ['setter', Compatible.Setters],
            ['static-method', Compatible.StaticMethods],
            ['static-property', Compatible.StaticProperties],
            ['static-accessor', Compatible.StaticAccessors],
            ['static-getter', Compatible.StaticGetters],
            ['static-setter', Compatible.StaticSetters],
        ];

        for (const [name, decorators] of cases) {

            const decorator = decorators.create(createOptions());

            NodeAssert.throws(
                () => decorator(undefined, createContext('unknown')),
                TypeError,
                `Case "${name}" should reject invalid arguments.`,
            );
        }
    });

    NodeTest.it('compose should reject invalid decorator arguments', () => {

        const cases: Array<[
            string,
            { compose: (decorators: any[]) => any },
            ErrorConstructor
        ]> = [
            ['class', Compatible.Classes, TypeError],
            ['method', Compatible.Methods, TypeError],
            ['property', Compatible.Properties, TypeError],
            ['accessor', Compatible.Accessors, TypeError],
            ['getter', Compatible.Getters, TypeError],
            ['setter', Compatible.Setters, TypeError],
            ['static-method', Compatible.StaticMethods, TypeError],
            ['static-property', Compatible.StaticProperties, TypeError],
            ['static-accessor', Compatible.StaticAccessors, TypeError],
            ['static-getter', Compatible.StaticGetters, TypeError],
            ['static-setter', Compatible.StaticSetters, TypeError],
            ['general', Compatible.GeneralDecorators, Error],
        ];

        for (const [name, decorators, errorCtor] of cases) {

            const decorator = decorators.compose([() => undefined]);

            NodeAssert.throws(
                () => decorator(undefined, createContext('unknown')),
                errorCtor,
                `Case "${name}" should reject invalid arguments.`,
            );
        }
    });

    NodeTest.it('compose should pass class replacements to following decorators', () => {

        class Replacement1 {}
        class Replacement2 {}

        const calls: string[] = [];
        const decorator = (Compatible.Classes as any).compose([
            (value: unknown) => {

                calls.push(value === Fixture ? 'class:first:original' : 'class:first:other');
                return Replacement1;
            },
            (value: unknown) => {

                calls.push(value === Replacement1 ? 'class:second:replacement' : 'class:second:other');
                return Replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(Fixture, { 'kind': 'class' }), Replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'class:first:original',
            'class:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass method replacements to following decorators', () => {

        const replacement1 = function replacement1() { return; };
        const replacement2 = function replacement2() { return; };
        const args: any[] = [function method() { return; }, createContext('method')];

        const calls: string[] = [];
        const decorator = (Compatible.Methods as any).compose([
            (value: unknown) => {

                calls.push(value === args[0] ? 'method:first:original' : 'method:first:other');
                return replacement1;
            },
            (value: unknown) => {

                calls.push(value === replacement1 ? 'method:second:replacement' : 'method:second:other');
                return replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'method:first:original',
            'method:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass getter replacements to following decorators', () => {

        const replacement1 = function replacement1() { return; };
        const replacement2 = function replacement2() { return; };
        const args: any[] = [function getter() { return; }, createContext('getter')];

        const calls: string[] = [];
        const decorator = (Compatible.Getters as any).compose([
            (value: unknown) => {

                calls.push(value === args[0] ? 'getter:first:original' : 'getter:first:other');
                return replacement1;
            },
            (value: unknown) => {

                calls.push(value === replacement1 ? 'getter:second:replacement' : 'getter:second:other');
                return replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'getter:first:original',
            'getter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass setter replacements to following decorators', () => {

        const replacement1 = function replacement1(value: string) { void value; };
        const replacement2 = function replacement2(value: string) { void value; };
        const args: any[] = [function setter(value: string) { void value; }, createContext('setter')];

        const calls: string[] = [];
        const decorator = (Compatible.Setters as any).compose([
            (value: unknown) => {

                calls.push(value === args[0] ? 'setter:first:original' : 'setter:first:other');
                return replacement1;
            },
            (value: unknown) => {

                calls.push(value === replacement1 ? 'setter:second:replacement' : 'setter:second:other');
                return replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'setter:first:original',
            'setter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-method replacements to following decorators', () => {

        const replacement1 = function replacement1() { return; };
        const replacement2 = function replacement2() { return; };
        const args: any[] = [function staticMethod() { return; }, createContext('method', true)];

        const calls: string[] = [];
        const decorator = (Compatible.StaticMethods as any).compose([
            (value: unknown) => {

                calls.push(value === args[0] ? 'static-method:first:original' : 'static-method:first:other');
                return replacement1;
            },
            (value: unknown) => {

                calls.push(value === replacement1 ? 'static-method:second:replacement' : 'static-method:second:other');
                return replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'static-method:first:original',
            'static-method:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-getter replacements to following decorators', () => {

        const replacement1 = function replacement1() { return; };
        const replacement2 = function replacement2() { return; };
        const args: any[] = [function staticGetter() { return; }, createContext('getter', true)];

        const calls: string[] = [];
        const decorator = (Compatible.StaticGetters as any).compose([
            (value: unknown) => {

                calls.push(value === args[0] ? 'static-getter:first:original' : 'static-getter:first:other');
                return replacement1;
            },
            (value: unknown) => {

                calls.push(value === replacement1 ? 'static-getter:second:replacement' : 'static-getter:second:other');
                return replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'static-getter:first:original',
            'static-getter:second:replacement',
        ]);
    });

    NodeTest.it('compose should pass static-setter replacements to following decorators', () => {

        const replacement1 = function replacement1(value: string) { void value; };
        const replacement2 = function replacement2(value: string) { void value; };
        const args: any[] = [function staticSetter(value: string) { void value; }, createContext('setter', true)];

        const calls: string[] = [];
        const decorator = (Compatible.StaticSetters as any).compose([
            (value: unknown) => {

                calls.push(value === args[0] ? 'static-setter:first:original' : 'static-setter:first:other');
                return replacement1;
            },
            (value: unknown) => {

                calls.push(value === replacement1 ? 'static-setter:second:replacement' : 'static-setter:second:other');
                return replacement2;
            },
        ]);

        NodeAssert.strictEqual(decorator(...args), replacement2);
        NodeAssert.deepStrictEqual(calls, [
            'static-setter:first:original',
            'static-setter:second:replacement',
        ]);
    });

    NodeTest.it('compose should chain field initializers for properties', () => {

        const calls: string[] = [];
        const decorator = (Compatible.Properties as any).compose([
            () => {

                calls.push('property:decorator:first');
                return function (value: string): string { return `${value}A`; };
            },
            () => {

                calls.push('property:decorator:second');
                return function (value: string): string { return `${value}B`; };
            },
        ]);

        const initializer: any = decorator(undefined, createContext('field'));

        NodeAssert.strictEqual(initializer.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, [
            'property:decorator:first',
            'property:decorator:second',
        ]);
    });

    NodeTest.it('compose should chain field initializers for static properties', () => {

        const calls: string[] = [];
        const decorator = (Compatible.StaticProperties as any).compose([
            () => {

                calls.push('static-property:decorator:first');
                return function (value: string): string { return `${value}A`; };
            },
            () => {

                calls.push('static-property:decorator:second');
                return function (value: string): string { return `${value}B`; };
            },
        ]);

        const initializer: any = decorator(undefined, createContext('field', true));

        NodeAssert.strictEqual(initializer.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, [
            'static-property:decorator:first',
            'static-property:decorator:second',
        ]);
    });

    NodeTest.it('compose should merge accessor replacements for member accessors', () => {

        const args: any[] = [{ 'get': () => 'base', 'set': (value: string) => { void value; } }, createContext('accessor')];

        const decorator = (Compatible.Accessors as any).compose([
            (target: any) => ({
                'get': function () { return `${target.get.call(this)}A`; },
                'init': function (value: string) { return `${value}A`; },
            }),
            (target: any) => ({
                'get': function () { return `${target.get.call(this)}B`; },
                'init': function (value: string) { return `${value}B`; },
            }),
        ]);

        const result: any = decorator(...args);

        NodeAssert.strictEqual(result.get.call({}), 'baseAB');
        NodeAssert.strictEqual(result.init.call({}, ''), 'AB');
    });

    NodeTest.it('compose should merge accessor replacements for static accessors', () => {

        const args: any[] = [
            { 'get': () => 'base', 'set': (value: string) => { void value; } },
            createContext('accessor', true),
        ];

        const decorator = (Compatible.StaticAccessors as any).compose([
            (target: any) => ({
                'get': function () { return `${target.get.call(this)}A`; },
                'init': function (value: string) { return `${value}A`; },
            }),
            (target: any) => ({
                'get': function () { return `${target.get.call(this)}B`; },
                'init': function (value: string) { return `${value}B`; },
            }),
        ]);

        const result: any = decorator(...args);

        NodeAssert.strictEqual(result.get.call({}), 'baseAB');
        NodeAssert.strictEqual(result.init.call({}, ''), 'AB');
    });

    NodeTest.it('compose should dispatch compatible general decorators in modern mode', () => {

        const calls: string[] = [];
        const decorator = Compatible.GeneralDecorators.compose([
            (...args: any[]) => {

                calls.push(args[1].kind === 'field' ? 'first:property' : 'first:other');
                return function (value: string): string { return `${value}A`; };
            },
            () => function (value: string): string { return `${value}B`; },
        ]);

        const initializer: any = decorator(undefined, createContext('field'));

        NodeAssert.strictEqual(initializer.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, ['first:property']);
    });
});
