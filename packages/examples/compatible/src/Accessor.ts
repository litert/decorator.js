import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateAccessor(v: string): LibDec.Accessors.ICallbackFn {

    return LibDec.Accessors.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'accessor',
                `legacy:${ctx.type}:${String(ctx.accessorName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_v, ctx) => {
            ctx.metadata!['accessor'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateAccessorNote(v: string): LibDec.Accessors.ICallbackFn {

    return LibDec.Accessors.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'accessorNote',
                `legacy:${ctx.type}:${String(ctx.accessorName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_v, ctx) => {
            ctx.metadata!['accessorNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateAccessorByCompose(v: string): LibDec.Accessors.ICallbackFn {

    return LibDec.Accessors.compose([
        decorateAccessor(v),
        decorateAccessorNote(v),
    ]);
}
