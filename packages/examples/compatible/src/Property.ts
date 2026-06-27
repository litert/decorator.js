import 'reflect-metadata';
import * as LibDec from '@litert/decorator/compatible';

export function decorateProperty(v: string): LibDec.Properties.ICallbackFn {

    return LibDec.Properties.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'property',
                `legacy:${ctx.type}:${String(ctx.propertyName)}:${v}`,
                ctx.constructor
            );
        },
        modern: (_value, ctx) => {
            ctx.metadata!['property'] = `modern:${ctx.kind}:${String(ctx.name)}:${v}`;
        },
    });
}

export function decoratePropertyNote(v: string): LibDec.Properties.ICallbackFn {

    return LibDec.Properties.create({
        legacy: (ctx) => {
            Reflect.defineMetadata(
                'propertyNote',
                `legacy:${ctx.type}:${String(ctx.propertyName)}:note:${v}`,
                ctx.constructor
            );
        },
        modern: (_value, ctx) => {
            ctx.metadata!['propertyNote'] = `modern:${ctx.kind}:${String(ctx.name)}:note:${v}`;
        },
    });
}

export function decoratePropertyByCompose(v: string): LibDec.Properties.ICallbackFn {

    return LibDec.Properties.compose([
        decorateProperty(v),
        decoratePropertyNote(v),
    ]);
}
