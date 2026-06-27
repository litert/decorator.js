import { Setters, getMetadataContainer } from '@litert/decorator';

function decX(v: string): Setters.ICallbackFn {

    return Setters.withArgsCheck((_setter, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): Setters.ICallbackFn {

    return (setter, ctx) => {

        if (!Setters.validateArgs([setter, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): Setters.ICallbackFn {

    return Setters.compose([decX(v), decY(v)]);
}

class Demo1 {

    @decX('hello')
    public set test1(value: string) {

        void value;
    }

    @decY('world')
    public set test2(value: string) {

        void value;
    }
}

class Demo2 {

    @decXY('go')
    public set test1(value: string) {

        void value;
    }
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:setter:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:setter:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:setter:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:setter:test1:go"
