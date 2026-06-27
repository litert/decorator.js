import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateStaticSetter(v: string): LibDec.StaticSetters.ICallbackFn {

    return LibDec.StaticSetters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticSetter',
                `legacy:${ctx.type}:${String(ctx.setterName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_setter, ctx) => {
            ctx.metadata!['staticSetter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateStaticSetterNote(v: string): LibDec.StaticSetters.ICallbackFn {

    return LibDec.StaticSetters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticSetterNote',
                `legacy:${ctx.type}:${String(ctx.setterName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_setter, ctx) => {
            ctx.metadata!['staticSetterNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateStaticSetterByCompose(
    v: string
): LibDec.StaticSetters.ICallbackFn {

    return LibDec.StaticSetters.compose([
        decorateStaticSetter(v),
        decorateStaticSetterNote(v),
    ]);
}
