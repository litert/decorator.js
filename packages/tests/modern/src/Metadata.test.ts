import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as LibDec from '@litert/decorator';

NodeTest.describe('[Modern] Metadata', () => {

    function createSetMetadataDecorator(key: string | symbol, value: unknown): LibDec.GeneralDecorators.ICallbackFn {

        return function(_v: unknown, ctx: LibDec.GeneralDecorators.IContext): any {

            ctx.metadata[key] = value;
        };
    }

    @LibDec.Classes.withArgsCheck(createSetMetadataDecorator('onClass', '1'))
    class TestClass {

        @LibDec.Methods.withArgsCheck(createSetMetadataDecorator('onMethod', 2))
        public testMethod(): void {}

        @LibDec.Properties.withArgsCheck(createSetMetadataDecorator('onProperty', 3))
        public testProperty: string = '';

        @LibDec.Accessors.withArgsCheck(createSetMetadataDecorator('onAccessor', 4))
        public accessor testAccessor: string = '';

        @LibDec.Getters.withArgsCheck(createSetMetadataDecorator('onGetter', 5))
        public get testGetter(): string { return ''; }

        @LibDec.Setters.withArgsCheck(createSetMetadataDecorator('onSetter', 6))
        public set testSetter(_v: string) {}

        @LibDec.StaticMethods.withArgsCheck(createSetMetadataDecorator('onStaticMethod', 7))
        public static testStaticMethod(): void {}

        @LibDec.StaticProperties.withArgsCheck(createSetMetadataDecorator('onStaticProperty', 8))
        public static testStaticProperty: string = '';

        @LibDec.StaticAccessors.withArgsCheck(createSetMetadataDecorator('onStaticAccessor', 9))
        public static accessor testStaticAccessor: string = '';

        @LibDec.StaticGetters.withArgsCheck(createSetMetadataDecorator('onStaticGetter', 10))
        public static get testStaticGetter(): string { return ''; }

        @LibDec.StaticSetters.withArgsCheck(createSetMetadataDecorator('onStaticSetter', 11))
        public static set testStaticSetter(_v: string) {}
    }

    NodeTest.it('should get metadata correctly', () => {

        const meta = LibDec.getMetadataContainer(TestClass)

        NodeAssert.strictEqual(meta.get('onClass'), '1');
        NodeAssert.strictEqual(meta.get('onMethod'), 2);
        NodeAssert.strictEqual(meta.get('onProperty'), 3);
        NodeAssert.strictEqual(meta.get('onAccessor'), 4);
        NodeAssert.strictEqual(meta.get('onGetter'), 5);
        NodeAssert.strictEqual(meta.get('onSetter'), 6);
        NodeAssert.strictEqual(meta.get('onStaticMethod'), 7);
        NodeAssert.strictEqual(meta.get('onStaticProperty'), 8);
        NodeAssert.strictEqual(meta.get('onStaticAccessor'), 9);
        NodeAssert.strictEqual(meta.get('onStaticGetter'), 10);
        NodeAssert.strictEqual(meta.get('onStaticSetter'), 11);
    });

    NodeTest.it('should set metadata correctly', () => {

        const meta = LibDec.getMetadataContainer(TestClass)

        NodeAssert.doesNotThrow(() => { meta.set('customKey', 'customValue'); })
        NodeAssert.strictEqual(meta.get('customKey'), 'customValue');
    });

    NodeTest.it('should check metadata existence correctly', () => {

        const meta = LibDec.getMetadataContainer(TestClass)

        NodeAssert.strictEqual(meta.has('onClass'), true);
        NodeAssert.strictEqual(meta.has('onMethod'), true);
        NodeAssert.strictEqual(meta.has('onProperty'), true);
        NodeAssert.strictEqual(meta.has('onAccessor'), true);
        NodeAssert.strictEqual(meta.has('onGetter'), true);
        NodeAssert.strictEqual(meta.has('onSetter'), true);
        NodeAssert.strictEqual(meta.has('onStaticMethod'), true);
        NodeAssert.strictEqual(meta.has('onStaticProperty'), true);
        NodeAssert.strictEqual(meta.has('onStaticAccessor'), true);
        NodeAssert.strictEqual(meta.has('onStaticGetter'), true);
        NodeAssert.strictEqual(meta.has('onStaticSetter'), true);
        NodeAssert.strictEqual(meta.has('nonExistingKey'), false);
        NodeAssert.strictEqual(meta.has('onMethodParameter'), false);
    });

    NodeTest.it('should remove metadata correctly', () => {

        const meta = LibDec.getMetadataContainer(TestClass)

        meta.set('removeKey', 'removeValue');

        NodeAssert.strictEqual(meta.has('removeKey'), true);

        meta.remove('removeKey');

        NodeAssert.strictEqual(meta.has('removeKey'), false);
        NodeAssert.strictEqual(meta.get('removeKey'), undefined);
        NodeAssert.doesNotThrow(() => { meta.remove('removeKey'); });
    });
});
