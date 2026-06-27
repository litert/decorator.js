# General Decorators

[TOC]

## Goal

Create a single decorator that automatically adapts to the kind of element it's applied to — class, method, property, accessor, getter, setter, or parameter.

## What are GeneralDecorators?

Type-specific decorators like `Methods.create()` or `Properties.create()` produce a decorator that only works on one kind of element. If you apply a method decorator to a property, it throws `TypeError`.

`GeneralDecorators` removes this restriction. You provide callbacks for the element kinds you want to support, and at runtime the decorator inspects the arguments it receives, determines the element kind, and dispatches to the correct callback.

This is useful for cross-cutting concerns like logging, validation, or metadata tagging that you want to apply uniformly across methods, properties, and classes.

## `create` — defining a general decorator

The `create` API accepts an options object where each property is a handler for one element kind. You only need to provide the ones you care about.

### Legacy

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';

const logKind = GeneralDecorators.create({
    onMethod: (ctx) => {
        console.log(`[method] ${String(ctx.methodName)}`);
    },
    onProperty: (ctx) => {
        console.log(`[property] ${String(ctx.propertyName)}`);
    },
    onClass: (ctx) => {
        console.log(`[class] ${ctx.constructor.name}`);
    },
});

@logKind
class Service {
    @logKind
    public handle(): void {}

    @logKind
    public data = 42;
}
// Output:
// [method] handle
// [property] data
// [class] Service
```

Each callback receives the same unified context object used by type-specific `create`. Legacy supports **14 element kinds**:

| Option | Element kind |
| --- | --- |
| `onClass` | Class declaration |
| `onAccessor` | Instance accessor (`get`/`set` pair or `accessor` keyword) |
| `onGetter` | Instance getter |
| `onSetter` | Instance setter |
| `onMethod` | Instance method |
| `onProperty` | Instance property / field |
| `onStaticAccessor` | Static accessor |
| `onStaticGetter` | Static getter |
| `onStaticSetter` | Static setter |
| `onStaticMethod` | Static method |
| `onStaticProperty` | Static property |
| `onMethodParameter` | Instance method parameter |
| `onStaticMethodParameter` | Static method parameter |
| `onConstructorParameter` | Constructor parameter |

### Modern

```ts
import { GeneralDecorators } from '@litert/decorator';

const logKind = GeneralDecorators.create({
    onMethod: (_method, ctx) => {
        console.log(`[${ctx.kind}] ${String(ctx.name)}`);
    },
    onField: (_value, ctx) => {
        console.log(`[${ctx.kind}] ${String(ctx.name)}`);
    },
    onClass: (_ctor, ctx) => {
        console.log(`[class] ${String(ctx.name)}`);
    },
});
```

The modern module supports **11 element kinds** (no parameter decorators — they don't exist in Stage 3):

| Option | Element kind |
| --- | --- |
| `onClass` | Class declaration |
| `onMethod` | Instance method |
| `onProperty` | Instance field |
| `onAccessor` | Instance accessor |
| `onGetter` | Instance getter |
| `onSetter` | Instance setter |
| `onStaticMethod` | Static method |
| `onStaticProperty` | Static field |
| `onStaticAccessor` | Static accessor |
| `onStaticGetter` | Static getter |
| `onStaticSetter` | Static setter |

### Compatible

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';

const logKind = GeneralDecorators.create({
    onMethod: {
        legacy: (ctx) => {
            console.log(`[legacy method] ${String(ctx.methodName)}`);
        },
        modern: (_method, ctx) => {
            console.log(`[modern ${ctx.kind}] ${String(ctx.name)}`);
        },
    },
    onProperty: {
        legacy: (ctx) => {
            console.log(`[legacy property] ${String(ctx.propertyName)}`);
        },
        modern: (_value, ctx) => {
            console.log(`[modern ${ctx.kind}] ${String(ctx.name)}`);
        },
    },
});
```

The Compatible module supports **11 element kinds** (same as modern). Each option value is **not** a plain callback — it's a `{ legacy, modern }` object, the same shape that type-specific Compatible `create` expects. The Compatible layer validates against both Stage 3 and experimental argument shapes, so the decorator works under either TypeScript transform.

## Dispatch priority

When a general decorator is applied, the runtime inspects the arguments and tries each registered kind in a fixed order. The **first match wins** — once a kind matches, no other kinds are tried. If no registered kind matches, the decorator throws `TypeError`.

### Legacy priority order

```
1.  onClass
2.  onAccessor           ← accessor before getter/setter
3.  onGetter
4.  onSetter
5.  onMethod
6.  onProperty
7.  onStaticAccessor
8.  onStaticGetter
9.  onStaticSetter
10. onStaticMethod
11. onStaticProperty
12. onMethodParameter
13. onStaticMethodParameter
14. onConstructorParameter
```

### Modern priority order

```
1.  onClass
2.  onMethod
3.  onProperty
4.  onAccessor
5.  onGetter
6.  onSetter
7.  onStaticMethod
8.  onStaticProperty
9.  onStaticAccessor
10. onStaticGetter
11. onStaticSetter
```

### Compatible priority order

```
1.  onClass
2.  onAccessor
3.  onGetter
4.  onSetter
5.  onMethod
6.  onProperty
7.  onStaticAccessor
8.  onStaticGetter
9.  onStaticSetter
10. onStaticMethod
11. onStaticProperty
```

> [!NOTE]
> The exact order between unrelated kinds (e.g. `onMethod` vs. `onAccessor`) is an implementation detail — in modern decorators each kind receives a distinct argument shape from TypeScript, so their validators are mutually exclusive. The order only matters between kinds that share the same argument shape, which is `accessor` / `getter` / `setter` (see below).

### Legacy priority order

```
1.  onClass
2.  onAccessor
3.  onGetter
4.  onSetter
5.  onMethod
6.  onProperty
7.  onStaticAccessor
8.  onStaticGetter
9.  onStaticSetter
10. onStaticMethod
11. onStaticProperty
12. onMethodParameter
13. onStaticMethodParameter
14. onConstructorParameter
```

## Accessor vs. getter vs. setter priority

In **legacy** decorators, accessors, getters, and setters all receive the same raw argument shape: `(prototype, name, descriptor)`. The only difference is what the descriptor contains:

- **Accessor**: `descriptor.get` and `descriptor.set` are both present
- **Getter**: only `descriptor.get` is present
- **Setter**: only `descriptor.set` is present

Because the argument shapes are identical, the dispatch order matters. `onAccessor` is always checked first, then `onGetter`, then `onSetter`. This means a paired `get`/`set` accessor declaration dispatches to `onAccessor`, not `onGetter` or `onSetter`.

In **modern** decorators, TypeScript generates distinct argument shapes for each kind (`accessor` receives a `{get, set}` target object, `getter` and `setter` receive the function directly), so the order between them is an implementation detail — their validators are mutually exclusive.

> [!TIP]
> If you provide `onAccessor` without `onGetter` and `onSetter`, standalone getters and setters will **not** be caught by `onAccessor`. The dispatch skips `onAccessor` (validator doesn't match), then skips `onGetter`/`onSetter` (you didn't register them), and eventually throws because no registered kind matched. If you want to handle all three, register all three.

## `compose` — combining general decorators

`GeneralDecorators.compose` works the same way as the type-specific `compose`, but dispatches through the same priority chain described above:

```ts
import { GeneralDecorators } from '@litert/decorator';

const logKind = GeneralDecorators.create({
    onMethod: (_m, ctx) => console.log(`[method] ${String(ctx.name)}`),
    onProperty: (_v, ctx) => console.log(`[field] ${String(ctx.name)}`),
});

const addMeta = GeneralDecorators.create({
    onMethod: (_m, ctx) => { ctx.metadata!['tag'] = 'method'; },
    onProperty: (_v, ctx) => { ctx.metadata!['tag'] = 'field'; },
});

const combined = GeneralDecorators.compose([logKind, addMeta]);

class Demo {
    @combined
    public handle(): void {}  // prints "[method] handle", sets metadata.tag = "method"
}
```

Execution is left-to-right: `logKind` runs first, then `addMeta`. Each decorator in the chain independently dispatches to its matching kind.

> [!IMPORTANT]
> Each decorator in a `GeneralDecorators.compose` chain dispatches independently. If the first decorator returns a replacement value (e.g., a new method for `onMethod`), subsequent decorators in the chain see the replacement, just like type-specific compose.

## Important considerations

### First-match-wins means no fallthrough

If you register `onAccessor` but not `onGetter`, and the decorator is applied to a standalone getter (not a paired accessor), the dispatch tries `onAccessor` first. If the getter's arguments don't match the accessor validator, it moves to the next kind in the list — but since you didn't register `onGetter`, the `onGetter` case is skipped. The loop continues through all remaining kinds. If none match, it throws.

### Type safety is limited

The `GeneralDecorators.ICallbackFn` signature accepts `...args: any[]`. TypeScript cannot statically verify that the decorator is applied to a supported element kind. If you apply a general decorator to an unsupported kind at runtime, it throws — but you won't get a compile-time error.

### Minimum one handler

`create` requires at least one `on*` option to be a function. Passing `{}` throws `TypeError`. Passing non-function values for any `on*` option also throws.

### Modern has no parameter support

The Stage 3 decorator proposal does not include parameter decorators. If you need parameter decorators, use the Legacy module. Compatible omits them for the same reason.

## When to use GeneralDecorators

| Use GeneralDecorators when | Use type-specific decorators when |
| --- | --- |
| One decorator needs to work across methods, properties, and classes | You only target one element kind |
| You're building a cross-cutting concern (logging, metrics, validation) | You need full type safety at the call site |
| You want a single exported decorator for consumers | The decorator logic differs significantly per kind |

## Next steps

| Page | Purpose |
| --- | --- |
| [Composition](./composition.md) | Combine decorators with execution order and replacement chaining. |
| [Unified Decorator API](./unified-api.md) | Understand the `create` unified context for Legacy and Compatible. |
| [Compatible Decorators](./compatible-decorators.md) | Build one decorator that works under both TypeScript transforms. |
