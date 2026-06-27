# Module `Modern.Properties`

Helpers for creating, composing, and validating member property decorators for the Stage 3 standard transform.

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator';
import { Properties as PropertiesFromModern } from '@litert/decorator/modern';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Combine multiple property decorators into one. |
| [`validateArgs`](./functions/validateArgs.md) | Validate that arguments match the modern property decorator form. |
| [`withArgsCheck`](./functions/withArgsCheck.md) | Wrap a decorator callback with automatic argument validation. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`IContext`](./Typings.md#type-alias-icontext) | The context object passed to the member property decorator callback function. |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of class member property decorators. |
