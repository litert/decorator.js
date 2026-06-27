# Function `compose`

Create a decorator that applies multiple static getter decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticGetterDecorators.ts#L108`](../../../../../../packages/library/src/legacy/StaticGetterDecorators.ts#L108)

[TOC]

## Import

```ts
import { StaticGetters } from '@litert/decorator/legacy';
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

A new decorator callback that applies the given decorators.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { StaticGetters } from '@litert/decorator/legacy';

const first: StaticGetters.ICallbackFn = (...args) => { void args; };
const second: StaticGetters.ICallbackFn = (...args) => { void args; };

const decorator = StaticGetters.compose([first, second]);
```
