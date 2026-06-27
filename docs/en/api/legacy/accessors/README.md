# Module `Legacy.Accessors`

Helpers for creating, composing, and validating member accessor decorators for the Stage 2 experimental transform.

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/legacy';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple accessor decorators into one. |
| [`create`](./functions/create.md) | Create a member accessor decorator from a unified callback. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the legacy accessor decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of class member accessor decorators. |
| [`IContext`](./Typings.md#interface-icontext) | The context object passed to the unified function style accessor decorator |
| [`IUnifiedFn`](./Typings.md#interface-iunifiedfn) | The unified function signature of class member accessor decorators. |
