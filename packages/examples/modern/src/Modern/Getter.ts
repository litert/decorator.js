import { Getters, getMetadataContainer } from '@litert/decorator';

function decX(v: string): Getters.ICallbackFn {

    return Getters.withArgsCheck((_getter, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): Getters.ICallbackFn {

    return (getter, ctx) => {

        if (!Getters.validateArgs([getter, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): Getters.ICallbackFn {

    return Getters.compose([decX(v), decY(v)]);
}

class Demo1 {

    @decX('hello')
    public get test1(): string {

        return 'getter';
    }

    @decY('world')
    public get test2(): string {

        return 'getter';
    }
}

class Demo2 {

    @decXY('go')
    public get test1(): string {

        return 'getter';
    }
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:getter:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:getter:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:getter:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:getter:test1:go"
