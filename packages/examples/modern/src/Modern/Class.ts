import { Classes, getMetadataContainer } from '@litert/decorator';

function decX(v: string): Classes.ICallbackFn {

    return Classes.withArgsCheck((_ctor, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): Classes.ICallbackFn {

    return (ctor, ctx) => {

        if (!Classes.validateArgs([ctor, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): Classes.ICallbackFn {

    return Classes.compose([decX(v), decY(v)]);
}

@decX('hello')
@decY('world')
class Demo1 {

}

@decXY('go')
class Demo2 {

}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:class:Demo1:hello"
console.log(meta1.get('y')); // Expected output: "modern:class:Demo1:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:class:Demo2:go"
console.log(meta2.get('y')); // Expected output: "modern:class:Demo2:go"
