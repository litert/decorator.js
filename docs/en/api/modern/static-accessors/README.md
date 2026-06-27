# Module `Modern.StaticAccessors`

Helpers for creating, composing, and validating static accessor decorators for the Stage 3 standard transform.

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator';
import { StaticAccessors as StaticAccessorsFromModern } from '@litert/decorator/modern';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple static accessor decorators into one. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the modern static accessor decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`IContext`](./Typings.md#type-alias-icontext) | The context object passed to the static accessor decorator callback function. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of static accessor decorators. |
