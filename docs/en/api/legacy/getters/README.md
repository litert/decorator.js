# Module `Legacy.Getters`

Helpers for creating, composing, and validating member getter decorators for the Stage 2 experimental transform.

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/legacy';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple getter decorators into one. |
| [`create`](./functions/create.md) | Create a member getter decorator from a unified callback. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the legacy getter decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of class member getter decorators. |
| [`IContext`](./Typings.md#interface-icontext) | The context object passed to the unified function style getter decorator |
| [`IUnifiedFn`](./Typings.md#interface-iunifiedfn) | The unified function signature of class member getter decorators. |
