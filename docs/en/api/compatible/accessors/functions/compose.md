# Function `compose`

Create a compatible decorator that applies multiple accessor decorators
in order.

Source: [`packages/library/src/compatible/AccessorDecorators.ts#L124`](../../../../../../packages/library/src/compatible/AccessorDecorators.ts#L124)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator/compatible';
```

Access this function as `Accessors.compose()`.

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
import { Accessors } from '@litert/decorator/compatible';

const first: Accessors.ICallbackFn = (...args) => { void args; };
const second: Accessors.ICallbackFn = (...args) => { void args; };

const decorator = Accessors.compose([first, second]);
```
