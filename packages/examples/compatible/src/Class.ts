import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateClass(v: string): LibDec.Classes.ICallbackFn {

    return LibDec.Classes.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'class',
                `legacy:${ctx.type}:${ctx.constructor.name}:${v}`,
                ctx.constructor
            );
        },
        modern: (_ctor, ctx) => {
            ctx.metadata!['class'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateClassNote(v: string): LibDec.Classes.ICallbackFn {

    return LibDec.Classes.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'classNote',
                `legacy:${ctx.type}:${ctx.constructor.name}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_ctor, ctx) => {
            ctx.metadata!['classNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateClassByCompose(v: string): LibDec.Classes.ICallbackFn {

    return LibDec.Classes.compose([
        decorateClass(v),
        decorateClassNote(v),
    ]);
}
