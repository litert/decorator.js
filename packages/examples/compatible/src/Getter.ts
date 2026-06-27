import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateGetter(v: string): LibDec.Getters.ICallbackFn {

    return LibDec.Getters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'getter',
                `legacy:${ctx.type}:${String(ctx.getterName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_getter, ctx) => {
            ctx.metadata!['getter'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateGetterNote(v: string): LibDec.Getters.ICallbackFn {

    return LibDec.Getters.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'getterNote',
                `legacy:${ctx.type}:${String(ctx.getterName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_getter, ctx) => {
            ctx.metadata!['getterNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateGetterByCompose(v: string): LibDec.Getters.ICallbackFn {

    return LibDec.Getters.compose([
        decorateGetter(v),
        decorateGetterNote(v),
    ]);
}
