import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateStaticProperty(v: string): LibDec.StaticProperties.ICallbackFn {

    return LibDec.StaticProperties.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticProperty',
                `legacy:${ctx.type}:${String(ctx.propertyName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_value, ctx) => {
            ctx.metadata!['staticProperty'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateStaticPropertyNote(v: string): LibDec.StaticProperties.ICallbackFn {

    return LibDec.StaticProperties.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticPropertyNote',
                `legacy:${ctx.type}:${String(ctx.propertyName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_value, ctx) => {
            ctx.metadata!['staticPropertyNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateStaticPropertyByCompose(
    v: string
): LibDec.StaticProperties.ICallbackFn {

    return LibDec.StaticProperties.compose([
        decorateStaticProperty(v),
        decorateStaticPropertyNote(v),
    ]);
}
