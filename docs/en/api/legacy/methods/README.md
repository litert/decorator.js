# Module `Legacy.Methods`

Helpers for creating, composing, and validating member method decorators for the Stage 2 experimental transform.

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/legacy';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple method decorators into one. |
| [`create`](./functions/create.md) | Create a method decorator from a unified callback. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the legacy method decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of class member method decorators. |
| [`IContext`](./Typings.md#interface-icontext) | The context object passed to the unified function style method decorator |
| [`IUnifiedFn`](./Typings.md#interface-iunifiedfn) | The unified function signature of class member method decorators. |
