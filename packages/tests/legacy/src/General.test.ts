import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { EContextType, GeneralDecorators } from '@litert/decorator/legacy';
import type {
    Accessors,
    Classes,
    ConstructorParameters,
    Getters,
    Methods,
    MethodParameters,
    Properties,
    Setters,
    StaticAccessors,
    StaticGetters,
    StaticMethods,
    StaticMethodParameters,
    StaticProperties,
    StaticSetters,
} from '@litert/decorator/legacy';

NodeTest.describe('[Legacy] General Decorators', () => {

    NodeTest.it('full-featured decorators should pass unified contexts', () => {

        const result: Record<string, unknown> = {};

        function testFullFeatured(pos: string): GeneralDecorators.ICallbackFn {

            return GeneralDecorators.create({
                'onClass': (ctx) => { result[pos] = ctx; },
                'onAccessor': (ctx) => { result[pos] = ctx; },
                'onConstructorParameter': (ctx) => { result[pos] = ctx; },
                'onGetter': (ctx) => { result[pos] = ctx; },
                'onMethod': (ctx) => { result[pos] = ctx; },
                'onMethodParameter': (ctx) => { result[pos] = ctx; },
                'onProperty': (ctx) => { result[pos] = ctx; },
                'onSetter': (ctx) => { result[pos] = ctx; },
                'onStaticAccessor': (ctx) => { result[pos] = ctx; },
                'onStaticGetter': (ctx) => { result[pos] = ctx; },
                'onStaticMethod': (ctx) => { result[pos] = ctx; },
                'onStaticMethodParameter': (ctx) => { result[pos] = ctx; },
                'onStaticProperty': (ctx) => { result[pos] = ctx; },
                'onStaticSetter': (ctx) => { result[pos] = ctx; },
            });
        }

        @testFullFeatured('class')
        class MyClass {

            @testFullFeatured('accessor')
            public get value(): string { return '123'; }
            public set value(v: string) { void v; }

            @testFullFeatured('getter')
            public get getter(): string { return '123'; }

            @testFullFeatured('property')
            public prop: string = '123';

            @testFullFeatured('setter')
            public set setter(v: string) { void v; }

            @testFullFeatured('method')
            public method(
                @testFullFeatured('method_parameter')
                param: string
            ): void {

                void param;
            }

            @testFullFeatured('static_property')
            public static staticProp: string = '123';

            @testFullFeatured('static_accessor')
            public static get staticValue(): string { return '123'; }
            public static set staticValue(v: string) { void v; }

            @testFullFeatured('static_getter')
            public static get staticGetter(): string { return '123'; }

            @testFullFeatured('static_setter')
            public static set staticSetter(v: string) { void v; }

            @testFullFeatured('static_method')
            public static staticMethod(
                @testFullFeatured('static_method_parameter')
                param: string
            ): void {

                void param;
            }

            public constructor(
                @testFullFeatured('constructor_parameter')
                param: string
            ) {

                void param;
            }
        }

        const classCtx = result['class'] as Classes.IContext;
        const accessorCtx = result['accessor'] as Accessors.IContext;
        const getterCtx = result['getter'] as Getters.IContext;
        const propertyCtx = result['property'] as Properties.IContext;
        const setterCtx = result['setter'] as Setters.IContext;
        const methodCtx = result['method'] as Methods.IContext;
        const methodParamCtx = result['method_parameter'] as MethodParameters.IContext;
        const staticAccessorCtx =
            result['static_accessor'] as StaticAccessors.IContext;
        const staticGetterCtx =
            result['static_getter'] as StaticGetters.IContext;
        const staticPropertyCtx = result['static_property'] as StaticProperties.IContext;
        const staticSetterCtx =
            result['static_setter'] as StaticSetters.IContext;
        const staticMethodCtx = result['static_method'] as StaticMethods.IContext;
        const staticMethodParamCtx =
            result['static_method_parameter'] as StaticMethodParameters.IContext;
        const constructorParamCtx =
            result['constructor_parameter'] as ConstructorParameters.IContext;

        NodeAssert.strictEqual(classCtx.type, EContextType.CLASS);
        NodeAssert.strictEqual(classCtx.constructor, MyClass);

        NodeAssert.strictEqual(accessorCtx.type, EContextType.ACCESSOR);
        NodeAssert.strictEqual(accessorCtx.constructor, MyClass);
        NodeAssert.strictEqual(accessorCtx.prototype, MyClass.prototype);
        NodeAssert.strictEqual(accessorCtx.accessorName, 'value');
        NodeAssert.strictEqual(typeof accessorCtx.descriptor.get, 'function');
        NodeAssert.strictEqual(typeof accessorCtx.descriptor.set, 'function');

        NodeAssert.strictEqual(getterCtx.type, EContextType.GETTER);
        NodeAssert.strictEqual(getterCtx.constructor, MyClass);
        NodeAssert.strictEqual(getterCtx.prototype, MyClass.prototype);
        NodeAssert.strictEqual(getterCtx.getterName, 'getter');
        NodeAssert.strictEqual(typeof getterCtx.descriptor.get, 'function');

        NodeAssert.strictEqual(propertyCtx.type, EContextType.PROPERTY);
        NodeAssert.strictEqual(propertyCtx.constructor, MyClass);
        NodeAssert.strictEqual(propertyCtx.prototype, MyClass.prototype);
        NodeAssert.strictEqual(propertyCtx.propertyName, 'prop');

        NodeAssert.strictEqual(setterCtx.type, EContextType.SETTER);
        NodeAssert.strictEqual(setterCtx.constructor, MyClass);
        NodeAssert.strictEqual(setterCtx.prototype, MyClass.prototype);
        NodeAssert.strictEqual(setterCtx.setterName, 'setter');
        NodeAssert.strictEqual(typeof setterCtx.descriptor.set, 'function');

        NodeAssert.strictEqual(methodCtx.type, EContextType.METHOD);
        NodeAssert.strictEqual(methodCtx.constructor, MyClass);
        NodeAssert.strictEqual(methodCtx.prototype, MyClass.prototype);
        NodeAssert.strictEqual(methodCtx.methodName, 'method');
        NodeAssert.strictEqual(typeof methodCtx.descriptor.value, 'function');

        NodeAssert.strictEqual(methodParamCtx.type, EContextType.METHOD_PARAMETER);
        NodeAssert.strictEqual(methodParamCtx.constructor, MyClass);
        NodeAssert.strictEqual(methodParamCtx.prototype, MyClass.prototype);
        NodeAssert.strictEqual(methodParamCtx.methodName, 'method');
        NodeAssert.strictEqual(methodParamCtx.parameterIndex, 0);

        NodeAssert.strictEqual(staticPropertyCtx.type, EContextType.STATIC_PROPERTY);
        NodeAssert.strictEqual(staticPropertyCtx.constructor, MyClass);
        NodeAssert.strictEqual(staticPropertyCtx.propertyName, 'staticProp');

        NodeAssert.strictEqual(staticAccessorCtx.type, EContextType.STATIC_ACCESSOR);
        NodeAssert.strictEqual(staticAccessorCtx.constructor, MyClass);
        NodeAssert.strictEqual(staticAccessorCtx.accessorName, 'staticValue');
        NodeAssert.strictEqual(typeof staticAccessorCtx.descriptor.get, 'function');
        NodeAssert.strictEqual(typeof staticAccessorCtx.descriptor.set, 'function');

        NodeAssert.strictEqual(staticGetterCtx.type, EContextType.STATIC_GETTER);
        NodeAssert.strictEqual(staticGetterCtx.constructor, MyClass);
        NodeAssert.strictEqual(staticGetterCtx.getterName, 'staticGetter');
        NodeAssert.strictEqual(typeof staticGetterCtx.descriptor.get, 'function');

        NodeAssert.strictEqual(staticSetterCtx.type, EContextType.STATIC_SETTER);
        NodeAssert.strictEqual(staticSetterCtx.constructor, MyClass);
        NodeAssert.strictEqual(staticSetterCtx.setterName, 'staticSetter');
        NodeAssert.strictEqual(typeof staticSetterCtx.descriptor.set, 'function');

        NodeAssert.strictEqual(staticMethodCtx.type, EContextType.STATIC_METHOD);
        NodeAssert.strictEqual(staticMethodCtx.constructor, MyClass);
        NodeAssert.strictEqual(staticMethodCtx.methodName, 'staticMethod');
        NodeAssert.strictEqual(typeof staticMethodCtx.descriptor.value, 'function');

        NodeAssert.strictEqual(
            staticMethodParamCtx.type,
            EContextType.STATIC_METHOD_PARAMETER,
        );
        NodeAssert.strictEqual(staticMethodParamCtx.constructor, MyClass);
        NodeAssert.strictEqual(staticMethodParamCtx.methodName, 'staticMethod');
        NodeAssert.strictEqual(staticMethodParamCtx.parameterIndex, 0);

        NodeAssert.strictEqual(
            constructorParamCtx.type,
            EContextType.CONSTRUCTOR_PARAMETER,
        );
        NodeAssert.strictEqual(constructorParamCtx.constructor, MyClass);
        NodeAssert.strictEqual(constructorParamCtx.parameterIndex, 0);
    });

    NodeTest.it('creating general decorators without cases should emit errors', () => {

        NodeAssert.throws(() => GeneralDecorators.create({}), TypeError);
    });

    NodeTest.it('creating general decorators with non-function cases should emit errors', () => {

        NodeAssert.throws(() => GeneralDecorators.create({
            'onClass': null as unknown as Classes.IUnifiedFn,
        }), TypeError);
    });

    NodeTest.it('partial general decorators should only work on specified cases', () => {

        const result: Record<string, boolean> = {};

        function testPartialGeneral(pos: string): GeneralDecorators.ICallbackFn {

            return GeneralDecorators.create({
                'onClass': () => { result[pos] = true; },
            });
        }

        NodeAssert.doesNotThrow(() => {

            @testPartialGeneral('class')
            class MyClass {}

            void MyClass;
        });

        NodeAssert.throws(() => {

            class MyClass {

                @testPartialGeneral('method')
                public method(): void {}
            }

            void MyClass;
        }, Error);

        NodeAssert.strictEqual(result['class'], true);
        NodeAssert.strictEqual(result['method'], undefined);
    });
});
