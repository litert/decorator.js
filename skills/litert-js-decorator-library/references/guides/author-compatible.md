# Author Compatible Decorators

## Required setup

- MUST import from `@litert/decorator/compatible`.
- MUST write decorators with `create({ legacy, modern })`.
- MUST keep the `legacy` callback on the unified legacy context and the `modern` callback on the Stage 3 callback shape.
- MUST keep metadata storage mode-specific: `reflect-metadata` in `legacy`, `ctx.metadata` in `modern`.
- NEVER use compatible decorators for parameter decorators.

## Authoring rules

- ALWAYS choose the namespace that matches the element kind.
- ALWAYS supply both `legacy` and `modern` implementations.
- ALWAYS keep both branches behaviorally aligned.
- ALWAYS use `compose()` only with decorators of the same compatible kind.
- NEVER call `getMetadataContainer()` inside the `legacy` branch.

## Example

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

## Read next

- Read `metadata-and-composition.md` for metadata rules and composition rules.
- Read `../library-docs/tutorials/compatible-decorators.md` for the compatible workflow.
- Read `../library-docs/tutorials/unified-api.md` for the legacy-side context fields.
- Read `../library-docs/api/compatible/README.md` for the full compatible API map.
