# Function `compose`

Create a decorator that applies multiple getter decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/GetterDecorators.ts#L116`](../../../../../../packages/library/src/legacy/GetterDecorators.ts#L116)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/legacy';
```

Access this function as `Getters.compose()`.

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
import { Getters } from '@litert/decorator/legacy';

const first: Getters.ICallbackFn = (...args) => { void args; };
const second: Getters.ICallbackFn = (...args) => { void args; };

const decorator = Getters.compose([first, second]);
```
