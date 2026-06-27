import 'reflect-metadata';
import { Classes } from '@litert/decorator/legacy';

function decX(v: string): Classes.ICallbackFn {

    return Classes.withArgsCheck((ctor) => {
        Reflect.defineMetadata('decX', `withArgsCheck:${ctor.name}:${v}`, ctor);
    });
}

function decY(v: string): Classes.ICallbackFn {

    return (ctor) => {

        if (!Classes.validateArgs([ctor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata('decY', `validateArgs:${ctor.name}:${v}`, ctor);
    };
}

function decZ(v: string): Classes.ICallbackFn {

    return Classes.create((ctx) => {
        Reflect.defineMetadata('decZ', `create:${ctx.type}:${ctx.constructor.name}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): Classes.ICallbackFn {

    return Classes.compose([decX(v), decY(v), decZ(v)]);
}

@decX('hello')
class Demo1 {

}

@decY('world')
class Demo2 {

}

@decZ('go')
class Demo3 {

}

@decXYZ('compose')
class Demo4 {

}

console.log(Reflect.getMetadata('decX', Demo1));   // Expected output: "withArgsCheck:Demo1:hello"
console.log(Reflect.getMetadata('decY', Demo2));   // Expected output: "validateArgs:Demo2:world"
console.log(Reflect.getMetadata('decZ', Demo3));   // Expected output: "create:class:Demo3:go"
console.log(Reflect.getMetadata('decX', Demo4));   // Expected output: "withArgsCheck:Demo4:compose"
console.log(Reflect.getMetadata('decY', Demo4));   // Expected output: "validateArgs:Demo4:compose"
console.log(Reflect.getMetadata('decZ', Demo4));   // Expected output: "create:class:Demo4:compose"
void Demo1;
void Demo2;
void Demo3;
void Demo4;
