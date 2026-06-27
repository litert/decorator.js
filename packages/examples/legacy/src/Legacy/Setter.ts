import 'reflect-metadata';
import { Setters } from '@litert/decorator/legacy';

function decX(v: string): Setters.ICallbackFn {

    return Setters.withArgsCheck((prototype, setterName) => {
        Reflect.defineMetadata(`decX:${String(setterName)}`, `withArgsCheck:${String(setterName)}:${v}`, prototype as object);
    });
}

function decY(v: string): Setters.ICallbackFn {

    return (prototype, setterName, descriptor) => {

        if (!Setters.validateArgs([prototype, setterName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(setterName)}`, `validateArgs:${String(setterName)}:${v}`, prototype as object);
    };
}

function decZ(v: string): Setters.ICallbackFn {

    return Setters.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.setterName)}`, `create:${ctx.type}:${String(ctx.setterName)}:${v}`, ctx.constructor.prototype);
    });
}

function decXYZ(v: string): Setters.ICallbackFn {

    return Setters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public set test1(value: string) {

        void value;
    }

    @decY('world')
    public set test2(value: string) {

        void value;
    }

    @decZ('go')
    public set test3(value: string) {

        void value;
    }
}

class Demo2 {

    @decXYZ('compose')
    public set test1(value: string) {

        void value;
    }
}

const p1 = Demo1.prototype;
console.log(Reflect.getMetadata('decX:test1', p1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', p1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', p1)); // Expected: "create:setter:test3:go"

const p2 = Demo2.prototype;
console.log(Reflect.getMetadata('decX:test1', p2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', p2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', p2)); // Expected: "create:setter:test1:compose"
void Demo1;
void Demo2;
