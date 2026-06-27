import 'reflect-metadata';
import { StaticMethods } from '@litert/decorator/legacy';

function decX(v: string): StaticMethods.ICallbackFn {

    return StaticMethods.withArgsCheck((ctor, methodName) => {
        Reflect.defineMetadata(`decX:${String(methodName)}`, `withArgsCheck:${String(methodName)}:${v}`, ctor);
    });
}

function decY(v: string): StaticMethods.ICallbackFn {

    return (ctor, methodName, descriptor) => {

        if (!StaticMethods.validateArgs([ctor, methodName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(methodName)}`, `validateArgs:${String(methodName)}:${v}`, ctor);
    };
}

function decZ(v: string): StaticMethods.ICallbackFn {

    return StaticMethods.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.methodName)}`, `create:${ctx.type}:${String(ctx.methodName)}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): StaticMethods.ICallbackFn {

    return StaticMethods.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public static test1(): void {
    }

    @decY('world')
    public static test2(): void {
    }

    @decZ('go')
    public static test3(): void {
    }
}

class Demo2 {

    @decXYZ('compose')
    public static test1(): void {
    }
}

console.log(Reflect.getMetadata('decX:test1', Demo1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', Demo1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', Demo1)); // Expected: "create:static_method:test3:go"

console.log(Reflect.getMetadata('decX:test1', Demo2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', Demo2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', Demo2)); // Expected: "create:static_method:test1:compose"
void Demo1;
void Demo2;
