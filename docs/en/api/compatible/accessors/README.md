# Module `Compatible.Accessors`

Helpers for creating and composing member accessor decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple accessor decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a member accessor decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy member accessor decorator context. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern member accessor decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a member accessor decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a member accessor decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible member accessor decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible member accessor decorator callback signature. |
