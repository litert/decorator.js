# Function `compose`

Create a compatible decorator that applies multiple getter decorators
in order.

Source: [`packages/library/src/compatible/GetterDecorators.ts#L119`](../../../../../../packages/library/src/compatible/GetterDecorators.ts#L119)

[TOC]

## Import

```ts
import { Getters } from '@litert/decorator/compatible';
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

A decorator callback that supports both legacy and modern transforms.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { Getters } from '@litert/decorator/compatible';

const first: Getters.ICallbackFn = (...args) => { void args; };
const second: Getters.ICallbackFn = (...args) => { void args; };

const decorator = Getters.compose([first, second]);
```
