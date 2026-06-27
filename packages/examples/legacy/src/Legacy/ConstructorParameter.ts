import 'reflect-metadata';
import { ConstructorParameters } from '@litert/decorator/legacy';

function decX(v: string): ConstructorParameters.ICallbackFn {

    return ConstructorParameters.withArgsCheck((ctor, _propertyKey, parameterIndex) => {
        Reflect.defineMetadata(`decX:${parameterIndex}`, `withArgsCheck:${parameterIndex}:${v}`, ctor);
    });
}

function decY(v: string): ConstructorParameters.ICallbackFn {

    return (ctor, _propertyKey, parameterIndex) => {

        if (!ConstructorParameters.validateArgs([ctor, _propertyKey, parameterIndex])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${parameterIndex}`, `validateArgs:${parameterIndex}:${v}`, ctor);
    };
}

function decZ(v: string): ConstructorParameters.ICallbackFn {

    return ConstructorParameters.create((ctx) => {
        Reflect.defineMetadata(`decZ:${ctx.parameterIndex}`, `create:${ctx.type}:${ctx.parameterIndex}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): ConstructorParameters.ICallbackFn {

    return ConstructorParameters.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    public constructor(@decX('hello') _value: string) {
    }
}

class Demo2 {

    public constructor(@decY('world') _value: string) {
    }
}

class Demo3 {

    public constructor(@decZ('go') _value: string) {
    }
}

class Demo4 {

    public constructor(@decXYZ('compose') _value: string) {
    }
}

console.log(Reflect.getMetadata('decX:0', Demo1));   // Expected: "withArgsCheck:0:hello"
console.log(Reflect.getMetadata('decY:0', Demo2));   // Expected: "validateArgs:0:world"
console.log(Reflect.getMetadata('decZ:0', Demo3));   // Expected: "create:constructor_parameter:0:go"
console.log(Reflect.getMetadata('decX:0', Demo4));   // Expected: "withArgsCheck:0:compose"
console.log(Reflect.getMetadata('decY:0', Demo4));   // Expected: "validateArgs:0:compose"
console.log(Reflect.getMetadata('decZ:0', Demo4));   // Expected: "create:constructor_parameter:0:compose"
void Demo1;
void Demo2;
void Demo3;
void Demo4;
