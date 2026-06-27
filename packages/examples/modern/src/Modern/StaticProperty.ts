import { StaticProperties, getMetadataContainer } from '@litert/decorator';

function decX(v: string): StaticProperties.ICallbackFn {

    return StaticProperties.withArgsCheck((_value, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): StaticProperties.ICallbackFn {

    return (value, ctx) => {

        if (!StaticProperties.validateArgs([value, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): StaticProperties.ICallbackFn {

    return StaticProperties.compose([decX(v), decY(v)]);
}

class Demo1 {

    @decX('hello')
    public static test1 = 'staticProperty';

    @decY('world')
    public static test2 = 'staticProperty';
}

class Demo2 {

    @decXY('go')
    public static test1 = 'staticProperty';
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:field:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:field:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:field:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:field:test1:go"
