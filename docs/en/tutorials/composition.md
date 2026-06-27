# Composition

[TOC]

## Goal

Combine multiple decorators of the same kind into one exported decorator using `compose`.

## How `compose` works

`compose` accepts an array of decorator callbacks and returns a single decorator that applies them **left-to-right in the order you list them**. The first decorator in the array runs first, then the second, and so on.

```ts
import { Methods } from '@litert/decorator';

const logA: Methods.ICallbackFn = (_method, ctx) => {
    console.log('A:', String(ctx.name));
};

const logB: Methods.ICallbackFn = (_method, ctx) => {
    console.log('B:', String(ctx.name));
};

const both = Methods.compose([logA, logB]);

class Demo {
    @both                        // prints "A: run" then "B: run"
    public run(): void {}
}
```

## Execution order rules

| Rule | Detail |
| --- | --- |
| Left-to-right | Decorators execute in the order they appear in the array: index 0 first, then 1, 2, etc. |
| Same kind only | All decorators in the array must be the same kind (e.g., all methods). You cannot mix a method decorator with a property decorator. |
| Empty arrays throw | Passing an empty array throws `TypeError`. |
| Non-functions throw | If any array element is not a function, `compose` throws `TypeError`. |

## Replacement chaining

Some decorator kinds support returning a replacement value (e.g., a new method, a new class, or a modified descriptor). When multiple decorators in a composed chain return replacements, the **last non-`undefined` return value wins** — it becomes the value the next decorator sees, and ultimately the value passed to the runtime.

### Kinds that support replacement

| Decorator kind | Replacement behavior |
| --- | --- |
| **Class** | Returning a new constructor replaces the class for subsequent decorators. |
| **Method** | Returning a new function replaces the method for subsequent decorators. |
| **Getter** | Returning a new getter function replaces it for subsequent decorators. |
| **Setter** | Returning a new setter function replaces it for subsequent decorators. |
| **Accessor** | Returning `{ get?, set?, init? }` merges with the previous target — the latest `get`/`set` wins, `init` functions are collected and composed. |

### Kinds that do NOT support replacement

Property (field) decorators and parameter decorators do not produce replacement values. Their composed functions return `void`.

### Example: chaining method replacements

```ts
import { Methods } from '@litert/decorator';

const doubler: Methods.ICallbackFn = (method) => {
    return function doubled(this: any, n: number): number {
        return method.call(this, n) * 2;
    };
};

const addOne: Methods.ICallbackFn = (method) => {
    return function plusOne(this: any, n: number): number {
        return method.call(this, n) + 1;
    };
};

const piped = Methods.compose([addOne, doubler]);

class Calc {
    @piped
    public value(n: number): number {
        return n;
    }
}

// Execution: value(5) → addOne wraps: (5 + 1) = 6 → doubler wraps: 6 * 2 = 12
console.log(new Calc().value(5)); // 12
```

Because `addOne` is first in the array, it wraps the original method. `doubler` runs next and wraps the result of `addOne`. The outermost wrapper is `doubler`.

## GeneralDecorators `compose`

`GeneralDecorators.compose` detects the element kind at runtime and dispatches through the same priority chain used by `GeneralDecorators.create`. For a full explanation of dispatch priority, accessor vs. getter vs. setter rules, and Compatible dual-transform validation, see the [General Decorators](./general-decorators.md) tutorial.

> [!TIP]
>
> Use type-specific `compose` (e.g. `Methods.compose`) when you know the exact decorator kind at authoring time — it has less overhead and better type safety. Use `GeneralDecorators.compose` when one composed decorator needs to adapt to multiple element kinds.

## Next steps

| Page | Purpose |
| --- | --- |
| [General Decorators](./general-decorators.md) | Full guide to `GeneralDecorators.create` and `GeneralDecorators.compose`. |
| [Unified Decorator API](./unified-api.md) | Learn the `create` unified context for Legacy and Compatible. |
| [Modern Decorators](./modern-decorators.md) | Build Stage 3 decorators with validation and metadata. |
| [Compatible Decorators](./compatible-decorators.md) | One decorator, both transforms. |

