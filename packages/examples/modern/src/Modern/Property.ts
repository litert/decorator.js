import { Properties, getMetadataContainer } from '@litert/decorator';

function decX(v: string): Properties.ICallbackFn {

    return Properties.withArgsCheck((_value, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): Properties.ICallbackFn {

    return (value, ctx) => {

        if (!Properties.validateArgs([value, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): Properties.ICallbackFn {

    return Properties.compose([decX(v), decY(v)]);
}

class Demo1 {

    @decX('hello')
    public test1 = 'property';

    @decY('world')
    public test2 = 'property';
}

class Demo2 {

    @decXY('go')
    public test1 = 'property';
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:field:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:field:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:field:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:field:test1:go"
