# Module `Compatible.Properties`

Helpers for creating and composing member property decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple property decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a member property decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy member property decorator context. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern member property decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a member property decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a member property decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible member property decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible member property decorator callback signature. |
