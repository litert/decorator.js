import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateStaticGetter(v: string): LibDec.StaticGetters.ICallbackFn {

    return LibDec.StaticGetters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticGetter',
                `legacy:${ctx.type}:${String(ctx.getterName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_getter, ctx) => {
            ctx.metadata!['staticGetter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateStaticGetterNote(v: string): LibDec.StaticGetters.ICallbackFn {

    return LibDec.StaticGetters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticGetterNote',
                `legacy:${ctx.type}:${String(ctx.getterName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_getter, ctx) => {
            ctx.metadata!['staticGetterNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateStaticGetterByCompose(
    v: string
): LibDec.StaticGetters.ICallbackFn {

    return LibDec.StaticGetters.compose([
        decorateStaticGetter(v),
        decorateStaticGetterNote(v),
    ]);
}
