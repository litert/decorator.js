import 'reflect-metadata';
import { Accessors } from '@litert/decorator/legacy';

function decX(v: string): Accessors.ICallbackFn {

    return Accessors.withArgsCheck((prototype, accessorName) => {
        Reflect.defineMetadata(`decX:${String(accessorName)}`, `withArgsCheck:${String(accessorName)}:${v}`, prototype as object);
    });
}

function decY(v: string): Accessors.ICallbackFn {

    return (prototype, accessorName, descriptor) => {

        if (!Accessors.validateArgs([prototype, accessorName, descriptor])) {

            throw new Error('Invalid arguments for decorator');
        }

        Reflect.defineMetadata(`decY:${String(accessorName)}`, `validateArgs:${String(accessorName)}:${v}`, prototype as object);
    };
}

function decZ(v: string): Accessors.ICallbackFn {

    return Accessors.create((ctx) => {
        Reflect.defineMetadata(`decZ:${String(ctx.accessorName)}`, `create:${ctx.type}:${String(ctx.accessorName)}:${v}`, ctx.constructor.prototype);
    });
}

function decXYZ(v: string): Accessors.ICallbackFn {

    return Accessors.compose([decX(v), decY(v), decZ(v)]);
}

class DemoGetSet {

    @decX('hello')
    public get pair1(): string {

        return 'accessor';
    }

    public set pair1(value: string) {

        void value;
    }

    @decY('world')
    public get pair2(): string {

        return 'accessor';
    }

    public set pair2(value: string) {

        void value;
    }

    @decZ('go')
    public get pair3(): string {

        return 'accessor';
    }

    public set pair3(value: string) {

        void value;
    }
}

class DemoKeyword {

    @decX('hello')
    public accessor keyword1: string = 'accessor';

    @decY('world')
    public accessor keyword2: string = 'accessor';

    @decZ('go')
    public accessor keyword3: string = 'accessor';
}

class DemoComposeGetSet {

    @decXYZ('compose')
    public get pair1(): string {

        return 'accessor';
    }

    public set pair1(value: string) {

        void value;
    }
}

class DemoComposeKeyword {

    @decXYZ('compose')
    public accessor keyword1: string = 'accessor';
}

const pGS = DemoGetSet.prototype;
console.log(Reflect.getMetadata('decX:pair1', pGS)); // Expected: "withArgsCheck:pair1:hello"
console.log(Reflect.getMetadata('decY:pair2', pGS)); // Expected: "validateArgs:pair2:world"
console.log(Reflect.getMetadata('decZ:pair3', pGS)); // Expected: "create:accessor:pair3:go"

const pKW = DemoKeyword.prototype;
console.log(Reflect.getMetadata('decX:keyword1', pKW)); // Expected: "withArgsCheck:keyword1:hello"
console.log(Reflect.getMetadata('decY:keyword2', pKW)); // Expected: "validateArgs:keyword2:world"
console.log(Reflect.getMetadata('decZ:keyword3', pKW)); // Expected: "create:accessor:keyword3:go"

const pCGS = DemoComposeGetSet.prototype;
console.log(Reflect.getMetadata('decX:pair1', pCGS)); // Expected: "withArgsCheck:pair1:compose"
console.log(Reflect.getMetadata('decY:pair1', pCGS)); // Expected: "validateArgs:pair1:compose"
console.log(Reflect.getMetadata('decZ:pair1', pCGS)); // Expected: "create:accessor:pair1:compose"

const pCK = DemoComposeKeyword.prototype;
console.log(Reflect.getMetadata('decX:keyword1', pCK)); // Expected: "withArgsCheck:keyword1:compose"
console.log(Reflect.getMetadata('decY:keyword1', pCK)); // Expected: "validateArgs:keyword1:compose"
console.log(Reflect.getMetadata('decZ:keyword1', pCK)); // Expected: "create:accessor:keyword1:compose"
void DemoGetSet;
void DemoKeyword;
void DemoComposeGetSet;
void DemoComposeKeyword;
