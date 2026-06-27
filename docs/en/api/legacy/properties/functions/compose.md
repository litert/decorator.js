# Function `compose`

Create a decorator that applies multiple property decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/PropertyDecorators.ts#L107`](../../../../../../packages/library/src/legacy/PropertyDecorators.ts#L107)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator/legacy';
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

A new decorator callback that applies the given decorators.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { Properties } from '@litert/decorator/legacy';

const first: Properties.ICallbackFn = (...args) => { void args; };
const second: Properties.ICallbackFn = (...args) => { void args; };

const decorator = Properties.compose([first, second]);
```
