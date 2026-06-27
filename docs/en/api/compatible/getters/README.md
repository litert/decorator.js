# Module `Compatible.Getters`

Helpers for creating and composing member getter decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple getter decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a member getter decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy member getter decorator context. |
| [`IGetterFn`](./Typings.md#type-alias-igetterfn) | The member getter function value handled by a modern decorator. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern member getter decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a member getter decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a member getter decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible member getter decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible member getter decorator callback signature. |
