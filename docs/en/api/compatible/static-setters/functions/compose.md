# Function `compose`

Create a compatible decorator that applies multiple static setter decorators
in order.

Source: [`packages/library/src/compatible/StaticSetterDecorators.ts#L125`](../../../../../../packages/library/src/compatible/StaticSetterDecorators.ts#L125)

[TOC]

## Import

```ts
import { StaticSetters } from '@litert/decorator/compatible';
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

A decorator callback that supports both legacy and modern transforms.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { StaticSetters } from '@litert/decorator/compatible';

const first: StaticSetters.ICallbackFn = (...args) => { void args; };
const second: StaticSetters.ICallbackFn = (...args) => { void args; };

const decorator = StaticSetters.compose([first, second]);
```
