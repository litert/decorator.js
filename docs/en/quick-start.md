# Quick Start

[TOC]

## Install

```bash
npm install @litert/decorator
```

## Configure TypeScript

Modern decorators require TypeScript's standard decorator transform. Disable `experimentalDecorators` and include this package's metadata typings:

```json
{
    "compilerOptions": {
        "experimentalDecorators": false,
        "types": ["@litert/decorator"]
    }
}
```

Legacy decorators require TypeScript's old experimental decorator transform:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

## Modern decorator

```ts
import {
    Methods,
    getMetadataContainer,
} from '@litert/decorator';

function mark(name: string): Methods.ICallbackFn {

    return Methods.withArgsCheck((_method, ctx) => {
        ctx.metadata![name] = true;
    });
}

class Service {

    @mark('tracked')
    public run(): void {}
}

console.log(getMetadataContainer(Service).get('tracked'));
```

## Legacy decorator

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/legacy';

function mark(name: string): Methods.ICallbackFn {

    return Methods.create((ctx) => {
        Reflect.defineMetadata(name, ctx.name, ctx.constructor);
    });
}

class Service {

    @mark('tracked')
    public run(): void {}
}

console.log(Reflect.getMetadata('tracked', Service));
```

> **Note**: Legacy decorators use [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata)
> for metadata storage. Do **not** use `getMetadataContainer` — it is designed
> for modern (Stage 3) decorators only.

## Compatible decorator

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/compatible';

const mark = Methods.create({
    legacy: (ctx) => {
        Reflect.defineMetadata('tracked', ctx.name, ctx.constructor);
    },
    modern: (_method, ctx) => {
        ctx.metadata!['tracked'] = ctx.name;
    },
});
```

## Choose an entrypoint

| Situation | Import path |
| --- | --- |
| New TypeScript standard decorators | `@litert/decorator` |
| Explicit modern import path | `@litert/decorator/modern` |
| Existing `experimentalDecorators` code | `@litert/decorator/legacy` |
| Shared decorators used by both builds | `@litert/decorator/compatible` |

## Next steps

| Page | Purpose |
| --- | --- |
| [Tutorials](./tutorials/README.md) | Learn the common decorator construction patterns. |
| [FAQ](./faq.md) | Review mode-specific behavior and migration questions. |
| [API Overview](./api/README.md) | Browse the full public API. |
