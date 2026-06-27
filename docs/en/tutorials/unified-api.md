# Unified Decorator API

[TOC]

## Goal

Understand the unified context object that `create` provides in Legacy and Compatible decorators, and learn when to use `create` vs. `withArgsCheck` vs. raw `validateArgs`.

## What is the unified context?

Legacy (Stage 2) decorators receive raw positional arguments that differ for each decorator kind — a class decorator gets `(constructor)`, a method decorator gets `(prototype, name, descriptor)`, a parameter decorator gets `(prototype, name, index)`, and so on. Remembering these signatures is error-prone.

The `create` API wraps the raw arguments into a single **unified context object** with named fields. Instead of:

```ts
// Raw legacy method decorator — you must remember the argument order
function dec(prototype: any, methodName: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
    // ...
}
```

You write:

```ts
// Unified context — all fields are named and discoverable
import { Methods } from '@litert/decorator/legacy';

function dec(label: string): Methods.ICallbackFn {
    return Methods.create((ctx) => {
        console.log(ctx.type);        // "method"
        console.log(ctx.constructor); // the class constructor
        console.log(ctx.methodName);  // the method name
        console.log(ctx.descriptor);  // the property descriptor
        console.log(ctx.prototype);   // the class prototype
    });
}
```

The Compatible module also uses the unified context for its `legacy` callback:

```ts
import { Methods } from '@litert/decorator/compatible';

const dec = Methods.create({
    legacy: (ctx) => {
        // ctx has the same unified shape as the Legacy example above
        console.log(ctx.type, ctx.methodName);
    },
    modern: (_method, ctx) => {
        ctx.metadata!['key'] = 'value';
    },
});
```

## Context shapes by decorator kind

Every context object has at least `type` and `constructor`. The remaining fields depend on the decorator kind.

### Class decorator context

| Field | Type | Description |
| --- | --- | --- |
| `type` | `"class"` | Identifies the decorator kind. |
| `constructor` | `Function` | The decorated class constructor. |

```ts
import { Classes } from '@litert/decorator/legacy';

const Entity = Classes.create((ctx) => {
    console.log(ctx.type);        // "class"
    console.log(ctx.constructor); // class User {}
});

@Entity
class User {}
```

### Method decorator context

| Field | Type | Description |
| --- | --- | --- |
| `type` | `"method"` | Identifies the decorator kind. |
| `constructor` | `Function` | The class constructor (`prototype.constructor`). |
| `prototype` | `object` | The class prototype. |
| `methodName` | `string \| symbol` | The method name. |
| `descriptor` | `TypedPropertyDescriptor<Function>` | The property descriptor (includes `.value`). |

### Property (field) decorator context

| Field | Type | Description |
| --- | --- | --- |
| `type` | `"property"` | Identifies the decorator kind. |
| `constructor` | `Function` | The class constructor. |
| `prototype` | `object` | The class prototype. |
| `propertyName` | `string \| symbol` | The property name. |

> **Note:** Property context has **no** `descriptor` — legacy property decorators receive only `(prototype, name)`.

### Accessor decorator context

| Field | Type | Description |
| --- | --- | --- |
| `type` | `"accessor"` | Identifies the decorator kind. |
| `constructor` | `Function` | The class constructor. |
| `prototype` | `object` | The class prototype. |
| `accessorName` | `string \| symbol` | The accessor name. |
| `descriptor` | `TypedPropertyDescriptor` | The property descriptor (includes `.get` and `.set`). |

### Getter / Setter decorator context

Same as accessor but with `type` set to `"getter"` / `"setter"` and the name field being `getterName` / `setterName`.

### Parameter decorator contexts

| Context | Extra fields beyond `type` and `constructor` |
| --- | --- |
| Method parameter | `prototype`, `methodName`, `parameterIndex` |
| Constructor parameter | `parameterIndex` (no `prototype` or `methodName`) |
| Static method parameter | `methodName`, `parameterIndex` (constructor is the class itself) |

### Static variants

Static methods, properties, accessors, getters, and setters match their instance counterparts, except:
- `type` is prefixed with `"static_"` (e.g., `"static_method"`)
- `constructor` refers to the class constructor directly (not `prototype.constructor`)

## `create` vs. `withArgsCheck` vs. `validateArgs`

All three APIs perform argument validation, but they differ in how you write the decorator callback:

| API | Callback style | When to use |
| --- | --- | --- |
| `create` | Unified context `(ctx) => ...` | You want named, discoverable fields. Recommended for most cases. |
| `withArgsCheck` | Raw arguments `(proto, name, dtr) => ...` | You prefer the raw argument style but still want automatic validation. |
| `validateArgs` | Manual check: `if (!X.validateArgs(args)) throw ...` | You need full control over error handling or dispatch logic. Returns a boolean. |

`create` is the idiomatic choice for most decorator code. Use `withArgsCheck` when you need raw arguments (e.g., for compatibility with external tooling). Use `validateArgs` when you're building your own dispatch logic (as the Compatible module does internally).

## Compatible `create` — the options object

Compatible decorators use a different pattern: you provide **both** a legacy and a modern callback. The Compatible layer detects the runtime argument shape and calls the correct one:

```ts
import { Methods } from '@litert/decorator/compatible';

const tracked = Methods.create({
    legacy: (ctx) => {
        // ctx is the unified legacy context
        Reflect.defineMetadata('tracked', ctx.methodName, ctx.constructor);
    },
    modern: (_method, ctx) => {
        // ctx is the standard Stage 3 context
        ctx.metadata!['tracked'] = ctx.name;
    },
});

class Service {
    @tracked
    public handle(): void {}
}
```

The `legacy` callback receives the same unified context as the Legacy module's `create`. The `modern` callback receives the standard Stage 3 decorator arguments `(valueOrMethod, context)`.

### Dispatch order

The Compatible layer checks the modern decorator form first. If the arguments match modern, it calls `opts.modern`. Otherwise it checks legacy, and calls `opts.legacy`. If neither matches, it throws `TypeError`.

## Next steps

| Page | Purpose |
| --- | --- |
| [Legacy Decorators](./legacy-decorators.md) | Full example of building a legacy decorator with `create`. |
| [Compatible Decorators](./compatible-decorators.md) | Build one decorator that works under both TypeScript transforms. |
| [Composition](./composition.md) | Combine multiple decorators safely with `compose`. |
