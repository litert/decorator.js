import 'reflect-metadata';
import { MethodParameters } from '@litert/decorator/legacy';

function decX(v: string): MethodParameters.ICallbackFn {

    return MethodParameters.withArgsCheck((prototype, methodName, parameterIndex) => {
        Reflect.defineMetadata(`decX:${String(methodName)}:${parameterIndex}`, `withArgsCheck:${String(methodName)}:${parameterIndex}:${v}`, prototype as object);
    });
}

function decY(v: string): MethodParameters.ICallbackFn {

    return (prototype, methodName, parameterIndex) => {

        if (!MethodParameters.validateArgs([prototype, methodName, parameterIndex])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(methodName)}:${parameterIndex}`, `validateArgs:${String(methodName)}:${parameterIndex}:${v}`, prototype as object);
    };
}

function decZ(v: string): MethodParameters.ICallbackFn {

    return MethodParameters.create((ctx) => {
        Reflect.defineMetadata(
            `decZ:${String(ctx.methodName)}:${ctx.parameterIndex}`,
            `create:${ctx.type}:${String(ctx.methodName)}:${ctx.parameterIndex}:${v}`,
            ctx.constructor.prototype
        );
    });
}

function decXYZ(v: string): MethodParameters.ICallbackFn {

    return MethodParameters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    public test1(@decX('hello') _value: string): void {
    }

    public test2(@decY('world') _value: string): void {
    }

    public test3(@decZ('go') _value: string): void {
    }
}

class Demo2 {

    public test1(@decXYZ('compose') _value: string): void {
    }
}

const p1 = Demo1.prototype;
console.log(Reflect.getMetadata('decX:test1:0', p1));  // Expected: "withArgsCheck:test1:0:hello"
console.log(Reflect.getMetadata('decY:test2:0', p1));  // Expected: "validateArgs:test2:0:world"
console.log(Reflect.getMetadata('decZ:test3:0', p1));  // Expected: "create:method_parameter:test3:0:go"

const p2 = Demo2.prototype;
console.log(Reflect.getMetadata('decX:test1:0', p2));  // Expected: "withArgsCheck:test1:0:compose"
console.log(Reflect.getMetadata('decY:test1:0', p2));  // Expected: "validateArgs:test1:0:compose"
console.log(Reflect.getMetadata('decZ:test1:0', p2));  // Expected: "create:method_parameter:test1:0:compose"
void Demo1;
void Demo2;
