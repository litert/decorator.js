# Module `Modern.Getters`

Helpers for creating, composing, and validating member getter decorators for the Stage 3 standard transform.

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator';
import { Getters as GettersFromModern } from '@litert/decorator/modern';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple getter decorators into one. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the modern getter decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`IContext`](./Typings.md#type-alias-icontext) | The context object passed to the member getter decorator callback function. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of class member getter decorators. |
