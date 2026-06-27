# Module `Legacy.ConstructorParameters`

Helpers for creating, composing, and validating constructor parameter decorators for the Stage 2 experimental transform.

[TOC]

## Import

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple constructor parameter decorators into one. |
| [`create`](./functions/create.md) | Create a constructor parameter decorator from a unified callback. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the legacy constructor parameter decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of class constructor parameter |
| [`IContext`](./Typings.md#interface-icontext) | The context object passed to the unified function style constructor parameter |
| [`IUnifiedFn`](./Typings.md#interface-iunifiedfn) | The unified function signature of class constructor parameter decorators. |
