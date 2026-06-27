# Compatible Decorators

[TOC]

## Goal

Create one decorator that works with both TypeScript decorator transforms.

## Implementation

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/compatible';

export const track = Methods.create({
    legacy: (ctx) => {
        Reflect.defineMetadata('tracked', ctx.name, ctx.constructor);
    },
    modern: (_method, ctx) => {
        ctx.metadata!['tracked'] = ctx.name;
    },
});
```

> **Note**: The `legacy` callback uses `reflect-metadata` (`Reflect.defineMetadata`)
> to store metadata against the class constructor. The `modern` callback writes
> to `ctx.metadata` because modern member decorators do not receive the owning
> class constructor or prototype. Do **not** use `getMetadataContainer` in legacy
> callbacks. It is designed for reading modern decorator metadata after the class
> has been defined.

## Dispatch model

| Runtime shape | Callback used |
| --- | --- |
| Legacy method decorator arguments | `legacy(ctx)` |
| Modern method decorator arguments | `modern(method, ctx)` |

The compatible helper validates the received arguments first. If the decorator is applied to the wrong kind of element, it throws `TypeError`.

## Example code

Compatible decorators have two layers: **definitions** (the implementations) and **consumers** (the code that applies them under each TypeScript transform). Every row below links to three files — one definition shared by both consumer builds.

| Decorator kind | Definition | Legacy consumer | Modern consumer |
| --- | --- | --- | --- |
| Class | [`Class.ts`](../../../packages/examples/compatible/src/Class.ts) | [`Class.ts`](../../../packages/examples/legacy/src/Compatible/Class.ts) | [`Class.ts`](../../../packages/examples/modern/src/Compatible/Class.ts) |
| Method | [`Method.ts`](../../../packages/examples/compatible/src/Method.ts) | [`Method.ts`](../../../packages/examples/legacy/src/Compatible/Method.ts) | [`Method.ts`](../../../packages/examples/modern/src/Compatible/Method.ts) |
| Property | [`Property.ts`](../../../packages/examples/compatible/src/Property.ts) | [`Property.ts`](../../../packages/examples/legacy/src/Compatible/Property.ts) | [`Property.ts`](../../../packages/examples/modern/src/Compatible/Property.ts) |
| Accessor | [`Accessor.ts`](../../../packages/examples/compatible/src/Accessor.ts) | [`Accessor.ts`](../../../packages/examples/legacy/src/Compatible/Accessor.ts) | [`Accessor.ts`](../../../packages/examples/modern/src/Compatible/Accessor.ts) |
| Getter | [`Getter.ts`](../../../packages/examples/compatible/src/Getter.ts) | [`Getter.ts`](../../../packages/examples/legacy/src/Compatible/Getter.ts) | [`Getter.ts`](../../../packages/examples/modern/src/Compatible/Getter.ts) |
| Setter | [`Setter.ts`](../../../packages/examples/compatible/src/Setter.ts) | [`Setter.ts`](../../../packages/examples/legacy/src/Compatible/Setter.ts) | [`Setter.ts`](../../../packages/examples/modern/src/Compatible/Setter.ts) |
| Static method | [`StaticMethod.ts`](../../../packages/examples/compatible/src/StaticMethod.ts) | [`StaticMethod.ts`](../../../packages/examples/legacy/src/Compatible/StaticMethod.ts) | [`StaticMethod.ts`](../../../packages/examples/modern/src/Compatible/StaticMethod.ts) |
| Static property | [`StaticProperty.ts`](../../../packages/examples/compatible/src/StaticProperty.ts) | [`StaticProperty.ts`](../../../packages/examples/legacy/src/Compatible/StaticProperty.ts) | [`StaticProperty.ts`](../../../packages/examples/modern/src/Compatible/StaticProperty.ts) |
| Static accessor | [`StaticAccessor.ts`](../../../packages/examples/compatible/src/StaticAccessor.ts) | [`StaticAccessor.ts`](../../../packages/examples/legacy/src/Compatible/StaticAccessor.ts) | [`StaticAccessor.ts`](../../../packages/examples/modern/src/Compatible/StaticAccessor.ts) |
| Static getter | [`StaticGetter.ts`](../../../packages/examples/compatible/src/StaticGetter.ts) | [`StaticGetter.ts`](../../../packages/examples/legacy/src/Compatible/StaticGetter.ts) | [`StaticGetter.ts`](../../../packages/examples/modern/src/Compatible/StaticGetter.ts) |
| Static setter | [`StaticSetter.ts`](../../../packages/examples/compatible/src/StaticSetter.ts) | [`StaticSetter.ts`](../../../packages/examples/legacy/src/Compatible/StaticSetter.ts) | [`StaticSetter.ts`](../../../packages/examples/modern/src/Compatible/StaticSetter.ts) |
