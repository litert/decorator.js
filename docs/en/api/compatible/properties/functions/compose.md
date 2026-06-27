# Function `compose`

Create a compatible decorator that applies multiple property decorators
in order.

Source: [`packages/library/src/compatible/PropertyDecorators.ts#L124`](../../../../../../packages/library/src/compatible/PropertyDecorators.ts#L124)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/compatible';
```

Access this function as `Properties.compose()`.

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
import { Properties } from '@litert/decorator/compatible';

const first: Properties.ICallbackFn = (...args) => { void args; };
const second: Properties.ICallbackFn = (...args) => { void args; };

const decorator = Properties.compose([first, second]);
```
