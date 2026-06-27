# Function `compose`

Create a compatible decorator that applies multiple static getter decorators
in order.

Source: [`packages/library/src/compatible/StaticGetterDecorators.ts#L122`](../../../../../../packages/library/src/compatible/StaticGetterDecorators.ts#L122)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/compatible';
```

Access this function as `StaticGetters.compose()`.

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
import { StaticGetters } from '@litert/decorator/compatible';

const first: StaticGetters.ICallbackFn = (...args) => { void args; };
const second: StaticGetters.ICallbackFn = (...args) => { void args; };

const decorator = StaticGetters.compose([first, second]);
```
