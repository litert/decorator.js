# Metadata

[TOC]

## Goal

Store class-level configuration from modern decorators and read it after the
class is defined.

> [!IMPORTANT]
>
> `getMetadataContainer` is designed for **modern (Stage 3) decorators** only. For legacy (Stage 2 / experimental) decorators, use the
> [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) module with
> `Reflect.defineMetadata()` and `Reflect.getMetadata()` instead. See the
> [Legacy Decorators](./legacy-decorators.md) tutorial for details.

## Core idea

Modern decorators should build a class configuration document through
`ctx.metadata`.

Modern class decorators receive the class value, but modern member decorators do
not receive the owning class constructor or prototype. This includes static
member decorators: they know that the member is static through `ctx.static`, but
they do not receive the constructor as the metadata target.

TypeScript gives every decorator for the same class a shared metadata object on
the decorator context. That object is the coordination point between class,
instance member, and static member decorators. Each decorator writes only the
configuration it knows locally, and the framework or application reads the
completed configuration after the class has been defined.

This is the important difference from legacy decorators. A legacy member
decorator can usually reach the class constructor through the prototype, so
legacy metadata patterns often use the constructor as the storage target. Modern
decorators should not be designed around discovering that constructor. Use the
metadata object as the class-level container instead.

## Configuration pattern

Use this pattern when several decorators contribute to one class-level model:

1. Define a private metadata key, usually a `Symbol`.
2. Define the full configuration shape for the class.
3. Write a small helper that creates or returns that configuration object from
   `ctx.metadata`.
4. Let each decorator add only its local configuration to that object.
5. Read the completed configuration with `getMetadataContainer(Class)` after the
   class declaration.

| Decorator position | What it should write |
| --- | --- |
| Class decorator | Class-level defaults, names, prefixes, or options. |
| Instance member decorator | Member name, kind, and member-specific options. |
| Static member decorator | Member name, `ctx.static`, and static-member options. |

## Controller configuration example

```ts
import {
    Classes,
    Methods,
    getMetadataContainer,
} from '@litert/decorator';

const CONTROLLER_CONFIG = Symbol('controller.config');

interface IRouteConfig {

    methodName: string | symbol;
    path: string;
    static: boolean;
}

interface IControllerConfig {

    prefix?: string;
    routes: IRouteConfig[];
}

function useControllerConfig(metadata: Record<PropertyKey, unknown>): IControllerConfig {

    return (metadata[CONTROLLER_CONFIG] ??= { routes: [] }) as IControllerConfig;
}

function Controller(prefix: string): Classes.ICallbackFn {

    return Classes.withArgsCheck((_class, ctx) => {
        useControllerConfig(ctx.metadata!).prefix = prefix;
    });
}

function Get(path: string): Methods.ICallbackFn {

    return Methods.withArgsCheck((_method, ctx) => {
        useControllerConfig(ctx.metadata!).routes.push({
            methodName: ctx.name,
            path,
            static: ctx.static,
        });
    });
}

@Controller('/users')
class UserController {

    @Get('/')
    public list(): void {}

    @Get('/:id')
    public detail(): void {}
}

const metadata = getMetadataContainer(UserController);
const config = metadata.get(CONTROLLER_CONFIG) as IControllerConfig;

console.log(config.prefix);
console.log(config.routes);
```

In this example, `Controller` and `Get` configure the same class without sharing
the class constructor at decoration time. `Controller` writes class-level
configuration. `Get` writes member-level configuration. Both write into the same
object stored under `CONTROLLER_CONFIG`.

The `Get` decorator never receives `UserController` or
`UserController.prototype`. It records `ctx.name`, `ctx.static`, and the route
path in the shared metadata object. The class constructor is needed later only by
the code that reads the completed metadata container.

## Metadata with legacy decorators

For legacy decorators, the pattern is different. Legacy decorator arguments
include either the class constructor or the prototype. The unified context
provided by `create` exposes `ctx.constructor`, so legacy decorators can use that
constructor as the metadata target. Use `reflect-metadata` instead of
`getMetadataContainer`:

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

## When a marker is enough

Some decorators only need a simple flag. The same model still applies: write the
flag to `ctx.metadata`, then read it from the class metadata container later.

```ts
import {
    Classes,
    getMetadataContainer,
} from '@litert/decorator';

const entity = Classes.withArgsCheck((_class, ctx) => {
    ctx.metadata!['entity'] = true;
});

@entity
class User {}

const metadata = getMetadataContainer(User);
console.log(metadata.has('entity'));
```

## Metadata container

| Method | Purpose |
| --- | --- |
| `get(key)` | Read a metadata value. |
| `set(key, value)` | Write or overwrite a metadata value. |
| `has(key)` | Check whether a key exists. |
| `remove(key)` | Delete a metadata value. |
