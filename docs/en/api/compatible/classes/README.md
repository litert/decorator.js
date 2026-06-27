# Module `Compatible.Classes`

Helpers for creating and composing class decorators that work across both legacy and modern TypeScript decorator transforms.

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple class decorators into one compatible decorator. |
| [`create`](./functions/create.md) | Create a class decorator supporting both legacy and modern decorator transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ILegacyContext`](./Typings.md#interface-ilegacycontext) | The legacy class decorator context passed to the compatible legacy callback. |
| [`IModernContext`](./Typings.md#interface-imoderncontext) | Minimal modern class decorator context shape. |
| [`ILegacyFn`](./Typings.md#interface-ilegacyfn) | The compatible legacy class decorator implementation. |
| [`IModernFn`](./Typings.md#interface-imodernfn) | The compatible modern class decorator implementation. |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible class decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible class decorator callback signature. |
