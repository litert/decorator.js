# FAQ

[TOC]

## Which entrypoint should I import?

Use `@litert/decorator` for modern TypeScript standard decorators. Use `@litert/decorator/legacy` for old experimental decorators. Use `@litert/decorator/compatible` when one decorator implementation must support both emitted argument shapes.

## Are `@litert/decorator` and `@litert/decorator/modern` different?

No. Both import paths resolve to the same modern implementation. The default path is shorter, while `@litert/decorator/modern` is useful when code wants to be explicit beside `/legacy` or `/compatible` imports.

## Why does modern decorator code need `types: ["@litert/decorator"]`?

The modern entrypoint installs a `Symbol.metadata` polyfill and provides typings for decorator metadata support. Add the package to `compilerOptions.types` so TypeScript sees those global declarations.

## Can compatible decorators support parameter decorators?

No. Legacy TypeScript decorators support parameter decorators, but modern standard decorators do not provide matching parameter decorator support. The compatible entrypoint therefore documents class and member decorators only.

## What is the difference between `validateArgs`, `withArgsCheck`, `create`, and `compose`?

| API | Purpose |
| --- | --- |
| `validateArgs` | Check whether raw decorator callback arguments match one decorator kind. |
| `withArgsCheck` | Wrap a callback and throw `TypeError` when it is applied to the wrong decorator kind. |
| `create` | Build a checked decorator from a normalized callback or compatible options object. |
| `compose` | Build one decorator that applies several decorators in order. |

## How are accessor-like general decorators dispatched?

General decorators use the priority `accessor > getter == setter`. The same rule applies to static accessor, static getter, and static setter decorators.

## Should I use legacy decorators for new code?

Prefer modern decorators for new TypeScript code unless the project already depends on `experimentalDecorators` behavior or parameter decorators. The legacy API remains available for existing Stage 2 decorator code.

## How do I store metadata with legacy decorators?

Use the [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) module. Do **not** use `getMetadataContainer` — that API is designed for modern (Stage 3) decorators only. Install `reflect-metadata` and import it once at your entry point, then use `Reflect.defineMetadata()` and `Reflect.getMetadata()` to write and read metadata.

```ts
import 'reflect-metadata';
import { Classes } from '@litert/decorator/legacy';

function entity(): Classes.ICallbackFn {

    return Classes.create((ctx) => {
        Reflect.defineMetadata('entity', true, ctx.constructor);
    });
}

@entity()
class User {}

console.log(Reflect.getMetadata('entity', User)); // true
```
