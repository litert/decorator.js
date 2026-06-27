import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import * as Compatible from '@litert/decorator/compatible';
import { EContextType } from '@litert/decorator/legacy';

NodeTest.describe('[Legacy] Compatible Member Decorators', () => {

    NodeTest.it('create should call legacy implementations in legacy decorators', () => {

        const calls: Record<string, unknown> = {};

        function getLegacyName(ctx: any): string | symbol {

            return ctx.methodName
                ?? ctx.propertyName
                ?? ctx.accessorName
                ?? ctx.getterName
                ?? ctx.setterName;
        }

        function createOptions(pos: string): any {

            return {
                legacy(ctx: any): void {

                    calls[`legacy:${pos}`] = `${ctx.type}:${String(getLegacyName(ctx))}`;
                },
                modern(value: any, ctx: any): void {

                    calls[`modern:${pos}`] = true;
                    void value;
                    void ctx;
                },
            };
        }

        class MyClass {

            private _accessorValue = 'accessor';

            private _setterValue = '';

            private static _staticAccessorValue = 'static-accessor';

            private static _staticSetterValue = '';

            @Compatible.Methods.create(createOptions('method'))
            public method(): void {

                return;
            }

            @Compatible.Properties.create(createOptions('property'))
            public property = 'property';

            @Compatible.Accessors.create(createOptions('accessor'))
            public get accessorValue(): string {

                return this._accessorValue;
            }

            public set accessorValue(value: string) {

                this._accessorValue = value;
            }

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
            public static get staticAccessorValue(): string {

                return this._staticAccessorValue;
            }

            public static set staticAccessorValue(value: string) {

                this._staticAccessorValue = value;
            }

            @Compatible.StaticGetters.create(createOptions('static-getter'))
            @Compatible.StaticGetters.create({
                legacy(ctx): void {
                    ctx.constructor
                },
                modern(value, ctx): void {
                    void value;
                    void ctx.constructor;
                },
            })
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
            'legacy:method': 'method:method',
            'legacy:property': 'property:property',
            'legacy:accessor': 'accessor:accessorValue',
            'legacy:getter': 'getter:getterValue',
            'legacy:setter': 'setter:setterValue',
            'legacy:static-method': `${EContextType.STATIC_METHOD}:staticMethod`,
            'legacy:static-property': `${EContextType.STATIC_PROPERTY}:staticProperty`,
            'legacy:static-accessor': `${EContextType.STATIC_ACCESSOR}:staticAccessorValue`,
            'legacy:static-getter': `${EContextType.STATIC_GETTER}:staticGetterValue`,
            'legacy:static-setter': `${EContextType.STATIC_SETTER}:staticSetterValue`,
        };

        for (const [key, value] of Object.entries(expectedCalls)) {

            NodeAssert.strictEqual(calls[key], value);
        }

        for (const key of Object.keys(expectedCalls)) {

            NodeAssert.strictEqual(
                calls[key.replace('legacy:', 'modern:')],
                undefined,
            );
        }
    });
});
