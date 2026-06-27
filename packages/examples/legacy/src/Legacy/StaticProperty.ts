import 'reflect-metadata';
import { StaticProperties } from '@litert/decorator/legacy';

function decX(v: string): StaticProperties.ICallbackFn {

    return StaticProperties.withArgsCheck((ctor, propertyName) => {
        Reflect.defineMetadata(`decX:${String(propertyName)}`, `withArgsCheck:${String(propertyName)}:${v}`, ctor);
    });
}

function decY(v: string): StaticProperties.ICallbackFn {

    return (ctor, propertyName, descriptor) => {

        if (!StaticProperties.validateArgs([ctor, propertyName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(propertyName)}`, `validateArgs:${String(propertyName)}:${v}`, ctor);
    };
}

function decZ(v: string): StaticProperties.ICallbackFn {

    return StaticProperties.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.propertyName)}`, `create:${ctx.type}:${String(ctx.propertyName)}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): StaticProperties.ICallbackFn {

    return StaticProperties.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public static test1 = 'staticProperty';

    @decY('world')
    public static test2 = 'staticProperty';

    @decZ('go')
    public static test3 = 'staticProperty';
}

class Demo2 {

    @decXYZ('compose')
    public static test1 = 'staticProperty';
}

console.log(Reflect.getMetadata('decX:test1', Demo1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', Demo1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', Demo1)); // Expected: "create:static_property:test3:go"

console.log(Reflect.getMetadata('decX:test1', Demo2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', Demo2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', Demo2)); // Expected: "create:static_property:test1:compose"
void Demo1;
void Demo2;
