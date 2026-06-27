# Function `compose`

Create a decorator that applies multiple getter decorators in order.

Source: [`packages/library/src/modern/GetterDecorators.ts#L48`](../../../../../../packages/library/src/modern/GetterDecorators.ts#L48)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator';
import { Getters as GettersFromModern } from '@litert/decorator/modern';
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
import { Getters } from '@litert/decorator';

const first: Getters.ICallbackFn = (...args) => { void args; };
const second: Getters.ICallbackFn = (...args) => { void args; };

const decorator = Getters.compose([first, second]);
```
