import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateStaticMethod(v: string): LibDec.StaticMethods.ICallbackFn {

    return LibDec.StaticMethods.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticMethod',
                `legacy:${ctx.type}:${String(ctx.methodName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_method, ctx) => {
            ctx.metadata!['staticMethod'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decorateStaticMethodNote(v: string): LibDec.StaticMethods.ICallbackFn {

    return LibDec.StaticMethods.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'staticMethodNote',
                `legacy:${ctx.type}:${String(ctx.methodName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_method, ctx) => {
            ctx.metadata!['staticMethodNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decorateStaticMethodByCompose(
    v: string
): LibDec.StaticMethods.ICallbackFn {

    return LibDec.StaticMethods.compose([
        decorateStaticMethod(v),
        decorateStaticMethodNote(v),
    ]);
}
