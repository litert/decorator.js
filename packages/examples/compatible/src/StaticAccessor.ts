import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateStaticAccessor(v: string): LibDec.StaticAccessors.ICallbackFn {

    return LibDec.StaticAccessors.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticAccessor',
                `legacy:${ctx.type}:${String(ctx.accessorName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_v, ctx) => {
            ctx.metadata!['staticAccessor'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateStaticAccessorNote(v: string): LibDec.StaticAccessors.ICallbackFn {

    return LibDec.StaticAccessors.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticAccessorNote',
                `legacy:${ctx.type}:${String(ctx.accessorName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_v, ctx) => {
            ctx.metadata!['staticAccessorNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateStaticAccessorByCompose(
    v: string
): LibDec.StaticAccessors.ICallbackFn {

    return LibDec.StaticAccessors.compose([
        decorateStaticAccessor(v),
        decorateStaticAccessorNote(v),
    ]);
}
