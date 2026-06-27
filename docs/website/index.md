---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@litert/decorator"
  text: ''
  tagline: Utilities for ECMAScript/TypeScript, to create decorators easily and effectively.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/quick-start.html
    - theme: alt
      text: Tutorials
      link: /en/tutorials/
    - theme: alt
      text: API Docs
      link: /en/api/

features:
  - title: Modern decorator supports
    details: Build standard decorators (stage 3) with target checks, composition helpers, and metadata access.
  - title: Legacy decorator supports
    details: Supports for legacy decorators (stage 2), for compatibility with TypeScript experimental decorators.
  - title: Compatible decorators
    details: Write one decorator definition that can work as both the modern and legacy decorator!
  - title: General decorators
    details: Write decorators that can adapt to the target kind, with automatic dispatching and pitfalls avoidance.
  - title: Unified Decorator API
    details: A simplified API for creating legacy and compatible decorators like modern decorators, with only a unified context parameter.
  - title: Utility functions
    details: A set of utility functions like argument checks, decorator composition, modern metadata polyfill, and etc.
---

## Installation

```sh
npm install @litert/decorator
```

## Quick Start

```ts
import { Methods, getMetadataContainer } from '@litert/decorator';

const myDecorator = Methods.withArgsCheck((_method, ctx) => {
    ctx.metadata!['myDecorator'] = true;
});

class DemoClass {
    @myDecorator
    public list(): void {}
}
```

## What it is

`@litert/decorator` is a focused utility library for writing decorators in
TypeScript. It does not provide application-level decorators such as routing,
dependency injection, or validation decorators. Instead, it helps you build those
decorators with less boilerplate around decorator signatures.

## Why use it

Decorator callback signatures differ by transform and by target kind. A class
decorator, method decorator, property decorator, static member decorator, and
legacy parameter decorator all receive different argument shapes.

This library provides checked helpers for those shapes, normalized legacy
contexts, composition utilities, modern metadata helpers, and a compatible layer
for code that needs to support both TypeScript decorator transforms.

## Entrypoints

| Import path | Use it for |
| --- | --- |
| `@litert/decorator` | Modern TypeScript standard decorators and metadata helpers. |
| `@litert/decorator/legacy` | Legacy TypeScript experimental decorators. |
| `@litert/decorator/compatible` | Decorators shared by modern and legacy builds. |
