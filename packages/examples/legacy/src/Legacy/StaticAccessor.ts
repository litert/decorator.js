import 'reflect-metadata';
import { StaticAccessors } from '@litert/decorator/legacy';

function decX(v: string): StaticAccessors.ICallbackFn {

    return StaticAccessors.withArgsCheck((ctor, accessorName) => {
        Reflect.defineMetadata(`decX:${String(accessorName)}`, `withArgsCheck:${String(accessorName)}:${v}`, ctor);
    });
}

function decY(v: string): StaticAccessors.ICallbackFn {

    return (ctor, accessorName, descriptor) => {

        if (!StaticAccessors.validateArgs([ctor, accessorName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(accessorName)}`, `validateArgs:${String(accessorName)}:${v}`, ctor);
    };
}

function decZ(v: string): StaticAccessors.ICallbackFn {

    return StaticAccessors.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.accessorName)}`, `create:${ctx.type}:${String(ctx.accessorName)}:${v}`, ctx.constructor);
    });
}

function decXYZ(v: string): StaticAccessors.ICallbackFn {

    return StaticAccessors.compose([decX(v), decY(v), decZ(v)]);
}

class DemoGetSet {

    @decX('hello')
    public static get pair1(): string {

        return 'staticAccessor';
    }

    public static set pair1(value: string) {

        void value;
    }

    @decY('world')
    public static get pair2(): string {

        return 'staticAccessor';
    }

    public static set pair2(value: string) {

        void value;
    }

    @decZ('go')
    public static get pair3(): string {

        return 'staticAccessor';
    }

    public static set pair3(value: string) {

        void value;
    }
}

class DemoKeyword {

    @decX('hello')
    public static accessor keyword1: string = 'staticAccessor';

    @decY('world')
    public static accessor keyword2: string = 'staticAccessor';

    @decZ('go')
    public static accessor keyword3: string = 'staticAccessor';
}

class DemoComposeGetSet {

    @decXYZ('compose')
    public static get pair1(): string {

        return 'staticAccessor';
    }

    public static set pair1(value: string) {

        void value;
    }
}

class DemoComposeKeyword {

    @decXYZ('compose')
    public static accessor keyword1: string = 'staticAccessor';
}

console.log(Reflect.getMetadata('decX:pair1', DemoGetSet)); // Expected: "withArgsCheck:pair1:hello"
console.log(Reflect.getMetadata('decY:pair2', DemoGetSet)); // Expected: "validateArgs:pair2:world"
console.log(Reflect.getMetadata('decZ:pair3', DemoGetSet)); // Expected: "create:static_accessor:pair3:go"

console.log(Reflect.getMetadata('decX:keyword1', DemoKeyword)); // Expected: "withArgsCheck:keyword1:hello"
console.log(Reflect.getMetadata('decY:keyword2', DemoKeyword)); // Expected: "validateArgs:keyword2:world"
console.log(Reflect.getMetadata('decZ:keyword3', DemoKeyword)); // Expected: "create:static_accessor:keyword3:go"

console.log(Reflect.getMetadata('decX:pair1', DemoComposeGetSet)); // Expected: "withArgsCheck:pair1:compose"
console.log(Reflect.getMetadata('decY:pair1', DemoComposeGetSet)); // Expected: "validateArgs:pair1:compose"
console.log(Reflect.getMetadata('decZ:pair1', DemoComposeGetSet)); // Expected: "create:static_accessor:pair1:compose"

console.log(Reflect.getMetadata('decX:keyword1', DemoComposeKeyword)); // Expected: "withArgsCheck:keyword1:compose"
console.log(Reflect.getMetadata('decY:keyword1', DemoComposeKeyword)); // Expected: "validateArgs:keyword1:compose"
console.log(Reflect.getMetadata('decZ:keyword1', DemoComposeKeyword)); // Expected: "create:static_accessor:keyword1:compose"
void DemoGetSet;
void DemoKeyword;
void DemoComposeGetSet;
void DemoComposeKeyword;
