import 'reflect-metadata';
import { StaticMethodParameters } from '@litert/decorator/legacy';

function decX(v: string): StaticMethodParameters.ICallbackFn {

    return StaticMethodParameters.withArgsCheck((ctor, methodName, parameterIndex) => {
        Reflect.defineMetadata(`decX:${String(methodName)}:${parameterIndex}`, `withArgsCheck:${String(methodName)}:${parameterIndex}:${v}`, ctor);
    });
}

function decY(v: string): StaticMethodParameters.ICallbackFn {

    return (ctor, methodName, parameterIndex) => {

        if (!StaticMethodParameters.validateArgs([ctor, methodName, parameterIndex])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(methodName)}:${parameterIndex}`, `validateArgs:${String(methodName)}:${parameterIndex}:${v}`, ctor);
    };
}

function decZ(v: string): StaticMethodParameters.ICallbackFn {

    return StaticMethodParameters.create((ctx) => {
        Reflect.defineMetadata(
            `decZ:${String(ctx.methodName)}:${ctx.parameterIndex}`,
            `create:${ctx.type}:${String(ctx.methodName)}:${ctx.parameterIndex}:${v}`,
            ctx.constructor
        );
    });
}

function decXYZ(v: string): StaticMethodParameters.ICallbackFn {

    return StaticMethodParameters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    public static test1(@decX('hello') _value: string): void {
    }

    public static test2(@decY('world') _value: string): void {
    }

    public static test3(@decZ('go') _value: string): void {
    }
}

class Demo2 {

    public static test1(@decXYZ('compose') _value: string): void {
    }
}

console.log(Reflect.getMetadata('decX:test1:0', Demo1)); // Expected: "withArgsCheck:test1:0:hello"
console.log(Reflect.getMetadata('decY:test2:0', Demo1)); // Expected: "validateArgs:test2:0:world"
console.log(Reflect.getMetadata('decZ:test3:0', Demo1)); // Expected: "create:static_method_parameter:test3:0:go"

console.log(Reflect.getMetadata('decX:test1:0', Demo2)); // Expected: "withArgsCheck:test1:0:compose"
console.log(Reflect.getMetadata('decY:test1:0', Demo2)); // Expected: "validateArgs:test1:0:compose"
console.log(Reflect.getMetadata('decZ:test1:0', Demo2)); // Expected: "create:static_method_parameter:test1:0:compose"
void Demo1;
void Demo2;
