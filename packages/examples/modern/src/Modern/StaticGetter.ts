import { StaticGetters, getMetadataContainer } from '@litert/decorator';

function decX(v: string): StaticGetters.ICallbackFn {

    return StaticGetters.withArgsCheck((_getter, ctx) => {
        ctx.metadata!['x'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    });
}

function decY(v: string): StaticGetters.ICallbackFn {

    return (getter, ctx) => {

        if (!StaticGetters.validateArgs([getter, ctx])) {

            throw new Error('Invalid arguments for decorator');
        }

        ctx.metadata!['y'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
    };
}

function decXY(v: string): StaticGetters.ICallbackFn {

    return StaticGetters.compose([decX(v), decY(v)]);
}

class Demo1 {

    @decX('hello')
    public static get test1(): string {

        return 'staticGetter';
    }

    @decY('world')
    public static get test2(): string {

        return 'staticGetter';
    }
}

class Demo2 {

    @decXY('go')
    public static get test1(): string {

        return 'staticGetter';
    }
}

const meta1 = getMetadataContainer(Demo1);
console.log(meta1.get('x')); // Expected output: "modern:getter:test1:hello"
console.log(meta1.get('y')); // Expected output: "modern:getter:test2:world"

const meta2 = getMetadataContainer(Demo2);
console.log(meta2.get('x')); // Expected output: "modern:getter:test1:go"
console.log(meta2.get('y')); // Expected output: "modern:getter:test1:go"
