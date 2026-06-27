import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { GeneralDecorators } from '@litert/decorator/compatible';

NodeTest.describe('[Modern] Compatible General Decorators', () => {

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

    NodeTest.it('create should reject invalid decorator arguments', () => {

        const decorator = GeneralDecorators.create({
            'onClass': createOptions(),
        });

        NodeAssert.throws(
            () => decorator(undefined, {
                'kind': 'unknown',
                'name': 'unknown',
                'static': false,
            }),
            Error,
        );
    });

    NodeTest.it('create should reject empty decorator options', () => {

        NodeAssert.throws(
            () => GeneralDecorators.create({}),
            TypeError,
        );
        NodeAssert.throws(
            () => GeneralDecorators.create({}),
            TypeError,
        );
    });

    NodeTest.it('create should dispatch to modern implementations by decorator type', () => {

        const calls: Record<string, unknown> = {};

        function createOptions(pos: string): any {

            return {
                legacy(ctx: any): void {

                    calls[`legacy:${pos}`] = true;
                    void ctx;
                },
                modern(value: any, ctx: any): void {

                    calls[`modern:${pos}`] = `${ctx.kind}:${String(ctx.name)}:${ctx.static}`;
                    void value;
                },
            };
        }

        const decorator = GeneralDecorators.create({
            'onClass': createOptions('class'),
            'onMethod': createOptions('method'),
            'onProperty': createOptions('property'),
            'onAccessor': createOptions('accessor'),
            'onGetter': createOptions('getter'),
            'onSetter': createOptions('setter'),
            'onStaticMethod': createOptions('static-method'),
            'onStaticProperty': createOptions('static-property'),
            'onStaticAccessor': createOptions('static-accessor'),
            'onStaticGetter': createOptions('static-getter'),
            'onStaticSetter': createOptions('static-setter'),
        });

        @decorator
        class MyClass {

            private _setterValue = '';

            private static _staticSetterValue = '';

            @decorator
            public method(): void {

                return;
            }

            @decorator
            public property = 'property';

            @decorator
            public accessor accessorValue = 'accessor';

            @decorator
            public get getterValue(): string {

                return 'getter';
            }

            @decorator
            public set setterValue(value: string) {

                this._setterValue = value;
                void this._setterValue;
            }

            @decorator
            public static staticMethod(): void {

                return;
            }

            @decorator
            public static staticProperty = 'static-property';

            @decorator
            public static accessor staticAccessorValue = 'static-accessor';

            @decorator
            public static get staticGetterValue(): string {

                return 'static-getter';
            }

            @decorator
            public static set staticSetterValue(value: string) {

                this._staticSetterValue = value;
                void this._staticSetterValue;
            }
        }

        const instance = new MyClass();

        instance.accessorValue = instance.getterValue;
        instance.setterValue = instance.property;
        MyClass.staticAccessorValue = MyClass.staticGetterValue;
        MyClass.staticSetterValue = MyClass.staticProperty;
        MyClass.staticMethod();
        instance.method();

        const expectedCalls: Record<string, string> = {
            'modern:class': 'class:MyClass:undefined',
            'modern:method': 'method:method:false',
            'modern:property': 'field:property:false',
            'modern:accessor': 'accessor:accessorValue:false',
            'modern:getter': 'getter:getterValue:false',
            'modern:setter': 'setter:setterValue:false',
            'modern:static-method': 'method:staticMethod:true',
            'modern:static-property': 'field:staticProperty:true',
            'modern:static-accessor': 'accessor:staticAccessorValue:true',
            'modern:static-getter': 'getter:staticGetterValue:true',
            'modern:static-setter': 'setter:staticSetterValue:true',
        };

        for (const [key, value] of Object.entries(expectedCalls)) {

            NodeAssert.strictEqual(calls[key], value);
        }

        for (const key of Object.keys(expectedCalls)) {

            NodeAssert.strictEqual(
                calls[key.replace('modern:', 'legacy:')],
                undefined,
            );
        }
    });
});
