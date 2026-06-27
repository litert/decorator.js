import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as Compatible from '@litert/decorator/compatible';

NodeTest.describe('[Modern] Compatible Member Decorators', () => {

    NodeTest.it('create should call modern implementations in modern decorators', () => {

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

        class MyClass {

            private _setterValue = '';

            private static _staticSetterValue = '';

            @Compatible.Methods.create(createOptions('method'))
            public method(): void {

                return;
            }

            @Compatible.Properties.create(createOptions('property'))
            public property = 'property';

            @Compatible.Accessors.create(createOptions('accessor'))
            public accessor accessorValue = 'accessor';

            @Compatible.Getters.create(createOptions('getter'))
            public get getterValue(): string {

                return 'getter';
            }

            @Compatible.Setters.create(createOptions('setter'))
            public set setterValue(value: string) {

                this._setterValue = value;
                void this._setterValue;
            }

            @Compatible.StaticMethods.create(createOptions('static-method'))
            public static staticMethod(): void {

                return;
            }

            @Compatible.StaticProperties.create(createOptions('static-property'))
            public static staticProperty = 'static-property';

            @Compatible.StaticAccessors.create(createOptions('static-accessor'))
            public static accessor staticAccessorValue = 'static-accessor';

            @Compatible.StaticGetters.create(createOptions('static-getter'))
            public static get staticGetterValue(): string {

                return 'static-getter';
            }

            @Compatible.StaticSetters.create(createOptions('static-setter'))
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
