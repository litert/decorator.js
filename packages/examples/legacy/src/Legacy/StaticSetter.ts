import 'reflect-metadata';
import { StaticSetters } from '@litert/decorator/legacy';

function decX(v: string): StaticSetters.ICallbackFn {

    return StaticSetters.withArgsCheck((ctor, setterName) => {
        Reflect.defineMetadata(`decX:${String(setterName)}`, `withArgsCheck:${String(setterName)}:${v}`, ctor);
    });
}

function decY(v: string): StaticSetters.ICallbackFn {

    return (ctor, setterName, descriptor) => {

        if (!StaticSetters.validateArgs([ctor, setterName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(setterName)}`, `validateArgs:${String(setterName)}:${v}`, ctor);
    };
}

function decZ(v: string): StaticSetters.ICallbackFn {

    return StaticSetters.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.setterName)}`, `create:${ctx.type}:${String(ctx.setterName)}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): StaticSetters.ICallbackFn {

    return StaticSetters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public static set test1(value: string) {

        void value;
    }

    @decY('world')
    public static set test2(value: string) {

        void value;
    }

    @decZ('go')
    public static set test3(value: string) {

        void value;
    }
}

class Demo2 {

    @decXYZ('compose')
    public static set test1(value: string) {

        void value;
    }
}

console.log(Reflect.getMetadata('decX:test1', Demo1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', Demo1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', Demo1)); // Expected: "create:static_setter:test3:go"

console.log(Reflect.getMetadata('decX:test1', Demo2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', Demo2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', Demo2)); // Expected: "create:static_setter:test1:compose"
void Demo1;
void Demo2;
