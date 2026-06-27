# Module `Compatible.StaticAccessors`

Helpers for creating and composing static accessor decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple static accessor decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a static accessor decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy static accessor decorator context. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern static accessor decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy implementation for a static accessor decorator. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a static accessor decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible static accessor decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible static accessor decorator callback signature. |
