import {
    Accessors,
    GeneralDecorators,
    getMetadataContainer,
} from '@litert/decorator';

function decX(v: string): Accessors.ICallbackFn {

    return Accessors.withArgsCheck((_v, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): Accessors.ICallbackFn {

    return (_v, ctx) => {

        if (!Accessors.validateArgs([_v, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): Accessors.ICallbackFn {

    return Accessors.compose([decX(v), decY(v)]);
}

function decGetSetPair(v: string): GeneralDecorators.ICallbackFn {

    return GeneralDecorators.create({
        onGetter: (_getter, ctx) => {
            ctx.metadata!['pairGetter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
        onSetter: (_setter, ctx) => {
            ctx.metadata!['pairSetter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

class Demo1 {

    @decX('hello')
    public accessor test1 = 'accessor';

    @decY('world')
    public accessor test2 = 'accessor';
}

class Demo2 {

    @decXY('go')
    public accessor test1 = 'accessor';
}

class DemoGetSetPair {

    @decGetSetPair('pair')
    public get pair1(): string {

        return 'accessor';
    }

    @decGetSetPair('pair')
    public set pair1(value: string) {

        void value;
    }
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:accessor:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:accessor:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:accessor:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:accessor:test1:go"

const pairMeta = getMetadataContainer(DemoGetSetPair);
console.log(pairMeta.get('pairGetter')); // Expected output: "modern:getter:pair1:pair"
console.log(pairMeta.get('pairSetter')); // Expected output: "modern:setter:pair1:pair"
