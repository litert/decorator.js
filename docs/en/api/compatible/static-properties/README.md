# Module `Compatible.StaticProperties`

Helpers for creating and composing static property decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple static property decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a static property decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy static property decorator context. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern static property decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a static property decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a static property decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible static property decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible static property decorator callback signature. |
