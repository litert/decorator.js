# Module `Compatible.StaticGetters`

Helpers for creating and composing static getter decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple static getter decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a static getter decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#type-alias-ilegacycontext) | The normalized legacy static getter decorator context. |
| [`IGetterFn`](./Typings.md#type-alias-igetterfn) | The static getter function value handled by a modern decorator. |
| [`IModernContext`](./Typings.md#type-alias-imoderncontext) | The locally declared modern static getter decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The legacy implementation callback used by Compatible.StaticGetters. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern implementation for a static getter decorator. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible static getter decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible static getter decorator callback signature. |
