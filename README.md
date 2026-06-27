# LiteRT/Decorator

[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org)
[![npm version](https://img.shields.io/npm/v/@litert/decorator.svg?colorB=brightgreen)](https://www.npmjs.com/package/@litert/decorator "Stable Version")
[![License](https://img.shields.io/npm/l/@litert/decorator.svg?maxAge=2592000?style=plastic)](https://github.com/litert/decorator.js/blob/master/LICENSE)
[![node](https://img.shields.io/node/v/@litert/decorator.svg?colorB=brightgreen)](https://nodejs.org/dist/latest-v8.x/)
[![GitHub issues](https://img.shields.io/github/issues/litert/decorator.js.svg)](https://github.com/litert/decorator.js/issues)
[![GitHub Releases](https://img.shields.io/github/release/litert/decorator.js.svg)](https://github.com/litert/decorator.js/releases "Stable Release")

A TypeScript decorator utility library that supports both Stage 3 (standard) and Stage 2 (experimental) decorators — and lets you write one implementation that works under both transforms.

## Highlights

- **Two transforms, one library** — separate entrypoints for modern Stage 3 decorators (`@litert/decorator`) and legacy experimental decorators (`@litert/decorator/legacy`), including parameter decorator support in legacy mode.
- **Compatible-mode decorators** — write a decorator once with `{ legacy, modern }` callbacks. The runtime detects which TypeScript transform produced the arguments and dispatches automatically. Consumers don't need to care which build they're using.
- **Argument validation** — every decorator kind validates its arguments at runtime. Mistakenly apply a method decorator to a class and you get a clear `TypeError`, not a silent bug.
- **Unified context API** — legacy decorators receive a normalized context object (`create`) instead of raw positional arguments, so you work with named fields like `ctx.type`, `ctx.methodName`, and `ctx.constructor`.
- **Composition** — combine multiple decorators of the same kind with `compose`. Supports replacement chaining for method, class, and accessor decorators.
- **General decorators** — build a single decorator that auto-adapts to the element kind (class, method, property, accessor, etc.) at runtime.
- **Metadata** — modern decorators get `Symbol.metadata` polyfill and a `getMetadataContainer` helper. Legacy decorators use `reflect-metadata` with full `Reflect.defineMetadata` / `Reflect.getMetadata` support.

## Installation

```sh
npm install @litert/decorator
```

## Quick usage

### Modern (Stage 3) decorator

```ts
import { Methods, getMetadataContainer } from '@litert/decorator';

function route(path: string): Methods.ICallbackFn {
    return Methods.withArgsCheck((_method, ctx) => {
        ctx.metadata!['route'] = path;
    });
}

class Controller {
    @route('/users')
    public list(): void {}
}

console.log(getMetadataContainer(Controller).get('route')); // '/users'
```

### Legacy (Stage 2) decorator

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/legacy';

function track(name: string): Methods.ICallbackFn {
    return Methods.create((ctx) => {
        Reflect.defineMetadata(name, ctx.methodName, ctx.constructor);
    });
}

class Service {
    @track('endpoint')
    public handle(): void {}
}

console.log(Reflect.getMetadata('endpoint', Service)); // 'handle'
```

### Compatible decorator (works under both transforms)

```ts
import 'reflect-metadata';
import { Methods } from '@litert/decorator/compatible';

export const track = Methods.create({
    legacy: (ctx) => {
        Reflect.defineMetadata('tracked', ctx.methodName, ctx.constructor);
    },
    modern: (_method, ctx) => {
        ctx.metadata!['tracked'] = ctx.name;
    },
});
```

## Documentation

| Document | Description |
| --- | --- |
| [Quick Start](./docs/en/quick-start.md) | Install, configure TypeScript, and create your first decorators. |
| [Tutorials](./docs/en/tutorials/README.md) | Step-by-step guides for modern, legacy, compatible, general, and composed decorators. |
| [API Reference](./docs/en/api/README.md) | Complete API reference for all three entrypoints. |
| [FAQ](./docs/en/faq.md) | Which entrypoint to choose, metadata guidance, and common questions. |

## Requirements

| Requirement | Version |
| --- | --- |
| Node.js | `>=22.0.0` |
| TypeScript | `>=5.0` |
| ECMAScript target | ES2022 or newer |

## AI Agent Skills

- `litert-js-decorator-library`

    The skill to guide the AI agent to use decorators in ECMAScript/TypeScript with the `@litert/decorator` library.

    Install with
    
    ```sh
    npx skills add https://github.com/litert/decorator.js \
      --skill "litert-js-decorator-library"
    ```

## License

This library is published under [Apache-2.0](./LICENSE) license.

## AI Disclaimer

This project may use AI tools to assist in documentation writing and inspiration for unit test cases, but all code is written and reviewed by human developers.
