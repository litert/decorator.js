import { StaticMethods, getMetadataContainer } from '@litert/decorator';

function decX(v: string): StaticMethods.ICallbackFn {

    return StaticMethods.withArgsCheck((_method, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): StaticMethods.ICallbackFn {

    return (method, ctx) => {

        if (!StaticMethods.validateArgs([method, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): StaticMethods.ICallbackFn {

    return StaticMethods.compose([decX(v), decY(v)]);
}

class Demo1 {

    @decX('hello')
    public static test1(): void {
    }

    @decY('world')
    public static test2(): void {
    }
}

class Demo2 {

    @decXY('go')
    public static test1(): void {
    }
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:method:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:method:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:method:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:method:test1:go"
