# Function `compose`

Create a decorator that applies multiple static setter decorators in order.

Source: [`packages/library/src/modern/StaticSetterDecorators.ts#L48`](../../../../../../packages/library/src/modern/StaticSetterDecorators.ts#L48)

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator';
import { StaticSetters as StaticSettersFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticSetters.compose()`.

## Signature

```ts
export function compose(decorators: readonly tLoc.ICallbackFn[]): tLoc.ICallbackFn;
```

## Parameters

- Parameter `decorators`

  The decorators to be applied.

## Return Value

A new decorator callback that applies the given decorators.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { StaticSetters } from '@litert/decorator';

const first: StaticSetters.ICallbackFn = (...args) => { void args; };
const second: StaticSetters.ICallbackFn = (...args) => { void args; };

const decorator = StaticSetters.compose([first, second]);
```
