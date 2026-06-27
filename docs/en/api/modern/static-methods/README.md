# Module `Modern.StaticMethods`

Helpers for creating, composing, and validating static method decorators for the Stage 3 standard transform.

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator';
import { StaticMethods as StaticMethodsFromModern } from '@litert/decorator/modern';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple static method decorators into one. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the modern static method decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`IContext`](./Typings.md#type-alias-icontext) | The context object passed to the static method decorator callback function. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of static method decorators. |
