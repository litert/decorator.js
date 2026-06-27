# Function `compose`

Create a compatible decorator that applies multiple static method decorators
in order.

Source: [`packages/library/src/compatible/StaticMethodDecorators.ts#L111`](../../../../../../packages/library/src/compatible/StaticMethodDecorators.ts#L111)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator/compatible';
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

A decorator callback that supports both legacy and modern transforms.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { StaticMethods } from '@litert/decorator/compatible';

const first: StaticMethods.ICallbackFn = (...args) => { void args; };
const second: StaticMethods.ICallbackFn = (...args) => { void args; };

const decorator = StaticMethods.compose([first, second]);
```
