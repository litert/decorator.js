# Function `compose`

Create a decorator that applies multiple static property decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticPropertyDecorators.ts#L99`](../../../../../../packages/library/src/legacy/StaticPropertyDecorators.ts#L99)

[TOC]

## Import

```ts
import { StaticProperties } from '@litert/decorator/legacy';
```

Access this function as `StaticProperties.compose()`.

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
import { StaticProperties } from '@litert/decorator/legacy';

const first: StaticProperties.ICallbackFn = (...args) => { void args; };
const second: StaticProperties.ICallbackFn = (...args) => { void args; };

const decorator = StaticProperties.compose([first, second]);
```
