import {
    GeneralDecorators,
    StaticAccessors,
    getMetadataContainer,
} from '@litert/decorator';

function decX(v: string): StaticAccessors.ICallbackFn {

    return StaticAccessors.withArgsCheck((_v, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): StaticAccessors.ICallbackFn {

    return (value, ctx) => {

        if (!StaticAccessors.validateArgs([value, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): StaticAccessors.ICallbackFn {

    return StaticAccessors.compose([decX(v), decY(v)]);
}

function decGetSetPair(v: string): GeneralDecorators.ICallbackFn {

    return GeneralDecorators.create({
        onStaticGetter: (_getter, ctx) => {
            ctx.metadata!['pairGetter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
        onStaticSetter: (_setter, ctx) => {
            ctx.metadata!['pairSetter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

class Demo1 {

    @decX('hello')
    public static accessor test1 = 'staticAccessor';

    @decY('world')
    public static accessor test2 = 'staticAccessor';
}

class Demo2 {

    @decXY('go')
    public static accessor test1 = 'staticAccessor';
}

class DemoGetSetPair {

    @decGetSetPair('pair')
    public static get pair1(): string {

        return 'staticAccessor';
    }

    @decGetSetPair('pair')
    public static set pair1(value: string) {

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
