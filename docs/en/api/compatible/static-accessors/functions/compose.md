# Function `compose`

Create a compatible decorator that applies multiple static accessor decorators
in order.

Source: [`packages/library/src/compatible/StaticAccessorDecorators.ts#L124`](../../../../../../packages/library/src/compatible/StaticAccessorDecorators.ts#L124)

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator/compatible';
```

Access this function as `StaticAccessors.compose()`.

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
import { StaticAccessors } from '@litert/decorator/compatible';

const first: StaticAccessors.ICallbackFn = (...args) => { void args; };
const second: StaticAccessors.ICallbackFn = (...args) => { void args; };

const decorator = StaticAccessors.compose([first, second]);
```
