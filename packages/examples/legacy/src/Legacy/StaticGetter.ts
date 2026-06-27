import 'reflect-metadata';
import { StaticGetters } from '@litert/decorator/legacy';

function decX(v: string): StaticGetters.ICallbackFn {

    return StaticGetters.withArgsCheck((ctor, getterName) => {
        Reflect.defineMetadata(`decX:${String(getterName)}`, `withArgsCheck:${String(getterName)}:${v}`, ctor);
    });
}

function decY(v: string): StaticGetters.ICallbackFn {

    return (ctor, getterName, descriptor) => {

        if (!StaticGetters.validateArgs([ctor, getterName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(getterName)}`, `validateArgs:${String(getterName)}:${v}`, ctor);
    };
}

function decZ(v: string): StaticGetters.ICallbackFn {

    return StaticGetters.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.getterName)}`, `create:${ctx.type}:${String(ctx.getterName)}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): StaticGetters.ICallbackFn {

    return StaticGetters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public static get test1(): string {

        return 'staticGetter';
    }

    @decY('world')
    public static get test2(): string {

        return 'staticGetter';
    }

    @decZ('go')
    public static get test3(): string {

        return 'staticGetter';
    }
}

class Demo2 {

    @decXYZ('compose')
    public static get test1(): string {

        return 'staticGetter';
    }
}

console.log(Reflect.getMetadata('decX:test1', Demo1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', Demo1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', Demo1)); // Expected: "create:static_getter:test3:go"

console.log(Reflect.getMetadata('decX:test1', Demo2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', Demo2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', Demo2)); // Expected: "create:static_getter:test1:compose"
void Demo1;
void Demo2;
