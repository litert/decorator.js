# Module `Modern.GeneralDecorators`

Decorator helpers that can apply to multiple element kinds (methods, properties, getters, setters, or accessors) depending on the options you supply.

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator';
import { GeneralDecorators as GeneralDecoratorsFromModern } from '@litert/decorator/modern';
```

## Functions

| Function | Description |
| --- | --- |
| [`compose`](./functions/compose.md) | Create a general decorator that applies multiple general decorators in order. |
| [`create`](./functions/create.md) | Create a general decorator function with the specified usage cases. |

## Typings

See [Typings](./Typings.md) for the public callback, context, and option contracts exported by this namespace.

| Type | Description |
| --- | --- |
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of modern general decorators. |
| [`IContext`](./Typings.md#type-alias-icontext) | The context object for the general decorators. |
| [`IGeneralDecoratorOptions`](./Typings.md#interface-igeneraldecoratoroptions) | The interface of options to specify the usage cases of a general decorator. |
