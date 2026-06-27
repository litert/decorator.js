# Function `compose`

Create a decorator that applies multiple class decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/ClassDecorators.ts#L101`](../../../../../../packages/library/src/legacy/ClassDecorators.ts#L101)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/legacy';
```

Access this function as `Classes.compose()`.

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
import { Classes } from '@litert/decorator/legacy';

const first: Classes.ICallbackFn = (...args) => { void args; };
const second: Classes.ICallbackFn = (...args) => { void args; };

const decorator = Classes.compose([first, second]);
```
