import 'reflect-metadata';
import { Methods } from '@litert/decorator/legacy';

function decX(v: string): Methods.ICallbackFn {

    return Methods.withArgsCheck((prototype, methodName) => {
        Reflect.defineMetadata(`decX:${String(methodName)}`, `withArgsCheck:${String(methodName)}:${v}`, prototype as object);
    });
}

function decY(v: string): Methods.ICallbackFn {

    return (prototype, methodName, descriptor) => {

        if (!Methods.validateArgs([prototype, methodName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(methodName)}`, `validateArgs:${String(methodName)}:${v}`, prototype as object);
    };
}

function decZ(v: string): Methods.ICallbackFn {

    return Methods.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.methodName)}`, `create:${ctx.type}:${String(ctx.methodName)}:${v}`, ctx.constructor.prototype);
    });
}

function decXYZ(v: string): Methods.ICallbackFn {

    return Methods.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public test1(): void {
    }

    @decY('world')
    public test2(): void {
    }

    @decZ('go')
    public test3(): void {
    }
}

class Demo2 {

    @decXYZ('compose')
    public test1(): void {
    }
}

const p1 = Demo1.prototype;
console.log(Reflect.getMetadata('decX:test1', p1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', p1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', p1)); // Expected: "create:method:test3:go"

const p2 = Demo2.prototype;
console.log(Reflect.getMetadata('decX:test1', p2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', p2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', p2)); // Expected: "create:method:test1:compose"
void Demo1;
void Demo2;
