import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as Modern from '@litert/decorator';

NodeTest.describe('[Modern] Compose Decorators', () => {

    class Fixture {}

    function createContext(kind: string, staticValue: boolean = false): any {

        return {
            'kind': kind,
            'name': `${staticValue ? 'static' : 'member'}-${kind}`,
            'static': staticValue,
        };
    }

    NodeTest.it('compose should reject invalid decorator lists', () => {

        NodeAssert.throws(() => Modern.Classes.compose([]), TypeError);
        NodeAssert.throws(() => Modern.Classes.compose([null as any]), TypeError);
    });

    NodeTest.it('compose should reject invalid decorator arguments', () => {

        const cases: Array<[
            string,
            { compose: (decorators: any[]) => any },
            ErrorConstructor
        ]> = [
            ['class', Modern.Classes, TypeError],
            ['method', Modern.Methods, TypeError],
            ['property', Modern.Properties, TypeError],
            ['accessor', Modern.Accessors, TypeError],
            ['getter', Modern.Getters, TypeError],
            ['setter', Modern.Setters, TypeError],
            ['static-method', Modern.StaticMethods, TypeError],
            ['static-property', Modern.StaticProperties, TypeError],
            ['static-accessor', Modern.StaticAccessors, TypeError],
            ['static-getter', Modern.StaticGetters, TypeError],
            ['static-setter', Modern.StaticSetters, TypeError],
            ['general', Modern.GeneralDecorators, Error],
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
        const decorator = (Modern.Classes as any).compose([
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
        const decorator = (Modern.Methods as any).compose([
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
        const decorator = (Modern.Getters as any).compose([
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
        const decorator = (Modern.Setters as any).compose([
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
        const decorator = (Modern.StaticMethods as any).compose([
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
        const decorator = (Modern.StaticGetters as any).compose([
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
        const decorator = (Modern.StaticSetters as any).compose([
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
        const decorator = (Modern.Properties as any).compose([
            () => {

                calls.push('property:decorator:first');
                return function (value: string): string {

                    calls.push('property:initializer:first');
                    return `${value}A`;
                };
            },
            () => {

                calls.push('property:decorator:second');
                return function (value: string): string {

                    calls.push('property:initializer:second');
                    return `${value}B`;
                };
            },
        ]);

        const initializer: any = decorator(undefined, createContext('field'));

        NodeAssert.strictEqual(initializer.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, [
            'property:decorator:first',
            'property:decorator:second',
            'property:initializer:first',
            'property:initializer:second',
        ]);
    });

    NodeTest.it('compose should return undefined without property initializers', () => {

        const calls: string[] = [];
        const decorator = (Modern.Properties as any).compose([
            () => { calls.push('property:first'); },
            () => { calls.push('property:second'); },
        ]);

        const result = decorator(undefined, createContext('field'));

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['property:first', 'property:second']);
    });

    NodeTest.it('compose should chain field initializers for static properties', () => {

        const calls: string[] = [];
        const decorator = (Modern.StaticProperties as any).compose([
            () => {

                calls.push('static-property:decorator:first');
                return function (value: string): string {

                    calls.push('static-property:initializer:first');
                    return `${value}A`;
                };
            },
            () => {

                calls.push('static-property:decorator:second');
                return function (value: string): string {

                    calls.push('static-property:initializer:second');
                    return `${value}B`;
                };
            },
        ]);

        const initializer: any = decorator(undefined, createContext('field', true));

        NodeAssert.strictEqual(initializer.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, [
            'static-property:decorator:first',
            'static-property:decorator:second',
            'static-property:initializer:first',
            'static-property:initializer:second',
        ]);
    });

    NodeTest.it('compose should merge accessor replacements and chain initializers for member accessors', () => {

        const args: any[] = [{ 'get': () => 'base', 'set': (value: string) => { void value; } }, createContext('accessor')];

        const calls: string[] = [];
        const decorator = (Modern.Accessors as any).compose([
            (target: any) => {

                calls.push(`accessor:first:${target.get.call({})}`);
                return {
                    'get': function () { return `${target.get.call(this)}A`; },
                    'init': function (value: string) { return `${value}A`; },
                };
            },
            (target: any) => {

                calls.push(`accessor:second:${target.get.call({})}`);
                return {
                    'get': function () { return `${target.get.call(this)}B`; },
                    'init': function (value: string) { return `${value}B`; },
                };
            },
        ]);

        const result: any = decorator(...args);

        NodeAssert.strictEqual(result.get.call({}), 'baseAB');
        NodeAssert.strictEqual(result.init.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, ['accessor:first:base', 'accessor:second:baseA']);
    });

    NodeTest.it('compose should ignore non-object accessor results and merge setters', () => {

        const args: any[] = [
            {
                'get': () => 'base',
                'set': (value: string) => { void value; },
            },
            createContext('accessor'),
        ];

        const calls: string[] = [];
        let setterValue = '';
        const decorator = (Modern.Accessors as any).compose([
            () => {

                calls.push('accessor:first');
                return undefined;
            },
            () => {

                calls.push('accessor:second');
                return {
                    'set': function (value: string): void {

                        setterValue = `${value}B`;
                    },
                };
            },
        ]);

        const result: any = decorator(...args);

        result.set('value');

        NodeAssert.strictEqual(result.get, undefined);
        NodeAssert.strictEqual(setterValue, 'valueB');
        NodeAssert.deepStrictEqual(calls, ['accessor:first', 'accessor:second']);
    });

    NodeTest.it('compose should return undefined without accessor replacements', () => {

        const args: any[] = [
            {
                'get': () => 'base',
                'set': (value: string) => { void value; },
            },
            createContext('accessor'),
        ];
        const calls: string[] = [];
        const decorator = (Modern.Accessors as any).compose([
            () => { calls.push('accessor:first'); },
            () => { calls.push('accessor:second'); },
        ]);

        const result = decorator(...args);

        NodeAssert.strictEqual(result, undefined);
        NodeAssert.deepStrictEqual(calls, ['accessor:first', 'accessor:second']);
    });

    NodeTest.it('compose should merge accessor replacements and chain initializers for static accessors', () => {

        const args: any[] = [
            { 'get': () => 'base', 'set': (value: string) => { void value; } },
            createContext('accessor', true),
        ];

        const calls: string[] = [];
        const decorator = (Modern.StaticAccessors as any).compose([
            (target: any) => {

                calls.push(`static-accessor:first:${target.get.call({})}`);
                return {
                    'get': function () { return `${target.get.call(this)}A`; },
                    'init': function (value: string) { return `${value}A`; },
                };
            },
            (target: any) => {

                calls.push(`static-accessor:second:${target.get.call({})}`);
                return {
                    'get': function () { return `${target.get.call(this)}B`; },
                    'init': function (value: string) { return `${value}B`; },
                };
            },
        ]);

        const result: any = decorator(...args);

        NodeAssert.strictEqual(result.get.call({}), 'baseAB');
        NodeAssert.strictEqual(result.init.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, ['static-accessor:first:base', 'static-accessor:second:baseA']);
    });

    NodeTest.it('compose should dispatch general decorators by modern target type', () => {

        const calls: string[] = [];
        const decorator = Modern.GeneralDecorators.compose([
            (...args: any[]) => {

                calls.push(Modern.Properties.validateArgs(args) ? 'first:property' : 'first:other');
                return function (value: string): string { return `${value}A`; };
            },
            () => function (value: string): string { return `${value}B`; },
        ]);

        const initializer: any = decorator(undefined, createContext('field'));

        NodeAssert.strictEqual(initializer.call({}, ''), 'AB');
        NodeAssert.deepStrictEqual(calls, ['first:property']);
    });

    NodeTest.it('class compose should reject property decorator targets', () => {

        const decorator = Modern.Classes.compose([() => undefined]);

        NodeAssert.throws(() => {

            (decorator as Modern.GeneralDecorators.ICallbackFn)(
                undefined,
                createContext('field'),
            );
        }, TypeError);
    });
});
