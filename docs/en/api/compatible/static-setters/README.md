# Module `Compatible.StaticSetters`

Helpers for creating and composing static setter decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple static setter decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a static setter decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy static setter decorator context. |
| [`ISetterFn`](./Typings.md#type-alias-isetterfn) | The static setter function value handled by a modern decorator. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern static setter decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a static setter decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a static setter decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible static setter decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible static setter decorator callback signature. |
