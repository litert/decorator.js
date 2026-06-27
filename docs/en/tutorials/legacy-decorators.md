# Legacy Decorators

[TOC]

## Goal

Create a legacy method decorator using the unified context style.

## Implementation

```ts
import { Methods } from '@litert/decorator/legacy';

function track(label: string): Methods.ICallbackFn {

    return Methods.create((ctx) => {
        Reflect.defineProperty(ctx.constructor, label, {
            configurable: true,
            value: ctx.name,
        });
    });
}

class Service {

    @track('trackedMethod')
    public run(): void {}
}
```

## Metadata

Legacy decorators should use the [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) module to store and read metadata. Do **not** use `getMetadataContainer` — that API is designed for modern (Stage 3) decorators only.

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/legacy';

function mark(name: string): Methods.ICallbackFn {

    return Methods.create((ctx) => {
        Reflect.defineMetadata(name, true, ctx.constructor);
    });
}

class Service {

    @mark('tracked')
    public run(): void {}
}

console.log(Reflect.getMetadata('tracked', Service)); // true
```

## Example code

| Decorator kind | Example |
| --- | --- |
| Class | [`Class.ts`](../../../packages/examples/legacy/src/Legacy/Class.ts) |
| Method | [`Method.ts`](../../../packages/examples/legacy/src/Legacy/Method.ts) |
| Property | [`Property.ts`](../../../packages/examples/legacy/src/Legacy/Property.ts) |
| Accessor | [`Accessor.ts`](../../../packages/examples/legacy/src/Legacy/Accessor.ts) |
| Getter | [`Getter.ts`](../../../packages/examples/legacy/src/Legacy/Getter.ts) |
| Setter | [`Setter.ts`](../../../packages/examples/legacy/src/Legacy/Setter.ts) |
| Static method | [`StaticMethod.ts`](../../../packages/examples/legacy/src/Legacy/StaticMethod.ts) |
| Static property | [`StaticProperty.ts`](../../../packages/examples/legacy/src/Legacy/StaticProperty.ts) |
| Static accessor | [`StaticAccessor.ts`](../../../packages/examples/legacy/src/Legacy/StaticAccessor.ts) |
| Static getter | [`StaticGetter.ts`](../../../packages/examples/legacy/src/Legacy/StaticGetter.ts) |
| Static setter | [`StaticSetter.ts`](../../../packages/examples/legacy/src/Legacy/StaticSetter.ts) |
| Method parameter | [`MethodParameter.ts`](../../../packages/examples/legacy/src/Legacy/MethodParameter.ts) |
| Static method parameter | [`StaticMethodParameter.ts`](../../../packages/examples/legacy/src/Legacy/StaticMethodParameter.ts) |
| Constructor parameter | [`ConstructorParameter.ts`](../../../packages/examples/legacy/src/Legacy/ConstructorParameter.ts) |

## Notes

| Step | Reason |
| --- | --- |
| Use `Methods.create` | The callback receives one normalized context object instead of raw legacy decorator arguments. |
| Read `ctx.constructor` | The unified context always includes the decorated class constructor. |
| Read `ctx.descriptor` when available | Method, accessor, getter, and setter decorators expose their property descriptor through the context. |
