# API Reference - @litert/decorator

The `@litert/decorator` package provides helper APIs for building TypeScript decorators. It supports three modes: modern Stage 3 decorators, legacy Stage 2 experimental decorators, and a compatible layer that lets you write one decorator implementation and have it work automatically under either transform.

[TOC]

## Overview

The package exposes four import paths. `@litert/decorator` and `@litert/decorator/modern` both resolve to the modern Stage 3 implementation with metadata polyfill support. `@litert/decorator/legacy` provides Stage 2 experimental decorator helpers, including parameter decorators. `@litert/decorator/compatible` is an adaptive compatibility layer: you write both the legacy and modern implementations once, and the runtime detects which transform produced the decorator arguments and dispatches to the correct implementation automatically.

## Modules

| Module | Import path | Description |
| --- | --- | --- |
| [Modern](./modern/README.md) | `@litert/decorator`, `@litert/decorator/modern` | Helpers for standard Stage 3 decorators, including the metadata polyfill and `getMetadataContainer`. |
| [Legacy](./legacy/README.md) | `@litert/decorator/legacy` | Helpers for Stage 2 experimental decorators (TypeScript with `experimentalDecorators`), including parameter decorator support. |
| [Compatible](./compatible/README.md) | `@litert/decorator/compatible` | Adaptive cross-transform decorator helpers. Write both legacy and modern implementations in one place; the compatible layer detects the runtime argument shape and calls the right one. Consumers of your decorator don't need to care which TypeScript transform they're using. |

## Source

The public import paths are declared in [`packages/library/package.json`](../../../packages/library/package.json).
