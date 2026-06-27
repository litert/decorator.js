# Function `compose`

Create a decorator that applies multiple setter decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/SetterDecorators.ts#L116`](../../../../../../packages/library/src/legacy/SetterDecorators.ts#L116)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/legacy';
```

Access this function as `Setters.compose()`.

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
import { Setters } from '@litert/decorator/legacy';

const first: Setters.ICallbackFn = (...args) => { void args; };
const second: Setters.ICallbackFn = (...args) => { void args; };

const decorator = Setters.compose([first, second]);
```
