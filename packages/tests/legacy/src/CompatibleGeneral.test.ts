import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { GeneralDecorators } from '@litert/decorator/compatible';
import { EContextType } from '@litert/decorator/legacy';

NodeTest.describe('[Legacy] Compatible General Decorators', () => {

    NodeTest.it('create should dispatch to legacy implementations by decorator type', () => {

        const calls: Record<string, unknown> = {};

        function getLegacyName(ctx: any): string | symbol {

            return ctx.methodName
                ?? ctx.propertyName
                ?? ctx.accessorName
                ?? ctx.getterName
                ?? ctx.setterName
                ?? ctx.constructor.name;
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

            private _accessorValue = 'accessor';

            private _setterValue = '';

            private static _staticAccessorValue = 'static-accessor';

            private static _staticSetterValue = '';

            @decorator
            public method(): void {

                return;
            }

            @decorator
            public property = 'property';

            @decorator
            public get accessorValue(): string {

                return this._accessorValue;
            }

            public set accessorValue(value: string) {

                this._accessorValue = value;
            }

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
            public static get staticAccessorValue(): string {

                return this._staticAccessorValue;
            }

            public static set staticAccessorValue(value: string) {

                this._staticAccessorValue = value;
            }

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
            'legacy:class': 'class:MyClass',
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
