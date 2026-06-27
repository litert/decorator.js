# Module `Compatible.GeneralDecorators`

Decorator helpers that can apply to multiple element kinds (methods, properties, getters, setters, or accessors) depending on the options you supply.

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple general decorators into one. |
| [`create`](./functions/create.md) | Create a general decorator callback supporting both legacy and modern transforms. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ICreateOptions`](./Typings.md#interface-icreateoptions) | The options used to create a compatible general decorator. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The compatible general decorator callback signature. |
