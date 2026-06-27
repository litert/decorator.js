import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateSetter(v: string): LibDec.Setters.ICallbackFn {

    return LibDec.Setters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'setter',
                `legacy:${ctx.type}:${String(ctx.setterName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_setter, ctx) => {
            ctx.metadata!['setter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateSetterNote(v: string): LibDec.Setters.ICallbackFn {

    return LibDec.Setters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'setterNote',
                `legacy:${ctx.type}:${String(ctx.setterName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_setter, ctx) => {
            ctx.metadata!['setterNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateSetterByCompose(v: string): LibDec.Setters.ICallbackFn {

    return LibDec.Setters.compose([
        decorateSetter(v),
        decorateSetterNote(v),
    ]);
}
