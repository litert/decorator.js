import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateMethod(v: string): LibDec.Methods.ICallbackFn {

    return LibDec.Methods.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'method',
                `legacy:${ctx.type}:${String(ctx.methodName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_method, ctx) => {
            ctx.metadata!['method'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateMethodNote(v: string): LibDec.Methods.ICallbackFn {

    return LibDec.Methods.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'methodNote',
                `legacy:${ctx.type}:${String(ctx.methodName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_method, ctx) => {
            ctx.metadata!['methodNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateMethodByCompose(v: string): LibDec.Methods.ICallbackFn {

    return LibDec.Methods.compose([
        decorateMethod(v),
        decorateMethodNote(v),
    ]);
}
