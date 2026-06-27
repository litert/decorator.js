# Module `Compatible.Methods`

Helpers for creating and composing member method decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple method decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a member method decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy member method decorator context. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern member method decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a member method decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a member method decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible member method decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible member method decorator callback signature. |
