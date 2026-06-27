# Module `Legacy.GeneralDecorators`

Decorator helpers that can apply to multiple element kinds (methods, properties, getters, setters, or accessors) depending on the options you supply.

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';
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
| [`ICallbackFn`](./Typings.md#interface-icallbackfn) | The callback function signature of legacy general decorators. |
| [`IGeneralDecoratorOptions`](./Typings.md#interface-igeneraldecoratoroptions) | Options used to create a general decorator with Legacy.GeneralDecorators. |
