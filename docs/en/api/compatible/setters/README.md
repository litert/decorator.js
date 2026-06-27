# Module `Compatible.Setters`

Helpers for creating and composing member setter decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple setter decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a member setter decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy member setter decorator context. |
| [`ISetterFn`](./Typings.md#type-alias-isetterfn) | The member setter function value handled by a modern decorator. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern member setter decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a member setter decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a member setter decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible member setter decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible member setter decorator callback signature. |
