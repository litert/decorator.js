import 'reflect-metadata';
import { Properties } from '@litert/decorator/legacy';

function decX(v: string): Properties.ICallbackFn {

    return Properties.withArgsCheck((prototype, propertyName) => {
        Reflect.defineMetadata(`decX:${String(propertyName)}`, `withArgsCheck:${String(propertyName)}:${v}`, prototype as object);
    });
}

function decY(v: string): Properties.ICallbackFn {

    return (prototype, propertyName, descriptor) => {

        if (!Properties.validateArgs([prototype, propertyName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(propertyName)}`, `validateArgs:${String(propertyName)}:${v}`, prototype as object);
    };
}

function decZ(v: string): Properties.ICallbackFn {

    return Properties.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.propertyName)}`, `create:${ctx.type}:${String(ctx.propertyName)}:${v}`, ctx.constructor.prototype);
    });
}

function decXYZ(v: string): Properties.ICallbackFn {

    return Properties.compose([decX(v), decY(v), decZ(v)]);
}

class Demo1 {

    @decX('hello')
    public test1 = 'property';

    @decY('world')
    public test2 = 'property';

    @decZ('go')
    public test3 = 'property';
}

class Demo2 {

    @decXYZ('compose')
    public test1 = 'property';
}

const p1 = Demo1.prototype;
console.log(Reflect.getMetadata('decX:test1', p1)); // Expected: "withArgsCheck:test1:hello"
console.log(Reflect.getMetadata('decY:test2', p1)); // Expected: "validateArgs:test2:world"
console.log(Reflect.getMetadata('decZ:test3', p1)); // Expected: "create:property:test3:go"

const p2 = Demo2.prototype;
console.log(Reflect.getMetadata('decX:test1', p2)); // Expected: "withArgsCheck:test1:compose"
console.log(Reflect.getMetadata('decY:test1', p2)); // Expected: "validateArgs:test1:compose"
console.log(Reflect.getMetadata('decZ:test1', p2)); // Expected: "create:property:test1:compose"
void Demo1;
void Demo2;
