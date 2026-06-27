# Function `compose`

Create a decorator that applies multiple static method decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticMethodDecorators.ts#L108`](../../../../../../packages/library/src/legacy/StaticMethodDecorators.ts#L108)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/legacy';
```

Access this function as `StaticMethods.compose()`.

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
import { StaticMethods } from '@litert/decorator/legacy';

const first: StaticMethods.ICallbackFn = (...args) => { void args; };
const second: StaticMethods.ICallbackFn = (...args) => { void args; };

const decorator = StaticMethods.compose([first, second]);
```
