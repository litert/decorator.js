import 'reflect-metadata';
import { Getters } from '@litert/decorator/legacy';

function decX(v: string): Getters.ICallbackFn {

    return Getters.withArgsCheck((prototype, getterName) => {
        Reflect.defineMetadata(`decX:${String(getterName)}`, `withArgsCheck:${String(getterName)}:${v}`, prototype as object);
    });
}

function decY(v: string): Getters.ICallbackFn {

    return (prototype, getterName, descriptor) => {

        if (!Getters.validateArgs([prototype, getterName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(getterName)}`, `validateArgs:${String(getterName)}:${v}`, prototype as object);
    };
}

function decZ(v: string): Getters.ICallbackFn {

    return Getters.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.getterName)}`, `create:${ctx.type}:${String(ctx.getterName)}:${v}`, ctx.constructor.prototype);
    });
}

function decXYZ(v: string): Getters.ICallbackFn {

    return Getters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public get test1(): string {

        return 'getter';
    }

    @decY('world')
    public get test2(): string {

        return 'getter';
    }

    @decZ('go')
    public get test3(): string {

        return 'getter';
    }
}

class Demo2 {

    @decXYZ('compose')
    public get test1(): string {

        return 'getter';
    }
}

const p1 = Demo1.prototype;
console.log(Reflect.getMetadata('decX:test1', p1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', p1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', p1)); // Expected: "create:getter:test3:go"

const p2 = Demo2.prototype;
console.log(Reflect.getMetadata('decX:test1', p2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', p2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', p2)); // Expected: "create:getter:test1:compose"
void Demo1;
void Demo2;
