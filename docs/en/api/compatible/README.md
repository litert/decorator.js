# Module `Compatible`

Adaptive cross-transform decorator helpers. You provide separate legacy and modern implementations, and the compatible layer detects which TypeScript decorator transform produced the runtime arguments and dispatches to the correct implementation automatically. Consumers of your decorator don't need to care which transform they're using — it works under both `experimentalDecorators` and the Stage 3 standard.

Import this module from `@litert/decorator/compatible`.

[TOC]

## Import

```ts
import * as Decorators from '@litert/decorator/compatible';
```

## Sub-Modules

| Sub-Module | Description |
| --- | --- |
| [`Classes`](./classes/README.md) | Class decorator helpers. |
| [`GeneralDecorators`](./general-decorators/README.md) | Decorator helpers that can apply to multiple element kinds (methods, properties, getters, setters, or accessors) depending on usage. |
| [`Methods`](./methods/README.md) | Member method decorator helpers. |
| [`Properties`](./properties/README.md) | Member property or field decorator helpers. |
| [`Accessors`](./accessors/README.md) | Member accessor decorator helpers. |
| [`Getters`](./getters/README.md) | Member getter decorator helpers. |
| [`Setters`](./setters/README.md) | Member setter decorator helpers. |
| [`StaticMethods`](./static-methods/README.md) | Static method decorator helpers. |
| [`StaticProperties`](./static-properties/README.md) | Static property or static field decorator helpers. |
| [`StaticAccessors`](./static-accessors/README.md) | Static accessor decorator helpers. |
| [`StaticGetters`](./static-getters/README.md) | Static getter decorator helpers. |
| [`StaticSetters`](./static-setters/README.md) | Static setter decorator helpers. |

## Functions

| Function | Description |
| --- | --- |
| [`getMetadataContainer`](./functions/getMetadataContainer.md) | Get the metadata container of a class by its constructor. This API is for **modern decorators only** — use [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) for legacy decorators. |

## Typings

See [Typings](./Typings.md) for top-level TypeScript helper contracts.
