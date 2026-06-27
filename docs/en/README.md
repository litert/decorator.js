# API Reference - @litert/decorator

## Overview

`@litert/decorator` is a TypeScript utility library for building ECMAScript decorators. It provides separate APIs for modern Stage 3 decorators, legacy Stage 2 decorators, and compatibility helpers that dispatch between both generated argument shapes.

## Start here

| Page | Purpose |
| --- | --- |
| [Quick Start](./quick-start.md) | Install the package and create the first modern, legacy, or compatible decorator. |
| [FAQ](./faq.md) | Choose the right entrypoint and understand decorator-mode differences. |
| [Tutorials](./tutorials/README.md) | Learn the recommended workflows for composing and sharing decorators. |
| [API Overview](./api/README.md) | Browse every public import path and namespace. |

## Entrypoints

| Import path | Use it for |
| --- | --- |
| `@litert/decorator` | Modern Stage 3 decorators and metadata helpers. |
| `@litert/decorator/modern` | Explicit alias of the modern Stage 3 entrypoint. |
| `@litert/decorator/legacy` | Legacy Stage 2 decorators emitted by TypeScript with `experimentalDecorators`. |
| `@litert/decorator/compatible` | Decorators shared by legacy and modern TypeScript builds. |

## Requirements

| Requirement | Version |
| --- | --- |
| Node.js | `>=22.0.0` |
| TypeScript | `>=5.0`, with current development on TypeScript 6 |
| ECMAScript target | ES2022 or newer |
