# Function `compose`

Create a compatible decorator that applies multiple method decorators
in order.

Source: [`packages/library/src/compatible/MethodDecorators.ts#L111`](../../../../../../packages/library/src/compatible/MethodDecorators.ts#L111)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator/compatible';
```

Access this function as `Methods.compose()`.

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
import { Methods } from '@litert/decorator/compatible';

const first: Methods.ICallbackFn = (...args) => { void args; };
const second: Methods.ICallbackFn = (...args) => { void args; };

const decorator = Methods.compose([first, second]);
```
