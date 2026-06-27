# Function `compose`

Create a general decorator that applies multiple general decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/GeneralDecorators.ts#L72`](../../../../../../packages/library/src/legacy/GeneralDecorators.ts#L72)

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';
```

Access this function as `GeneralDecorators.compose()`.

## Signature

```ts
export function compose(decorators: readonly tLoc.ICallbackFn[]): tLoc.ICallbackFn;
```

## Parameters

- Parameter `decorators`

  The decorators to be applied.

## Return Value

A general decorator callback.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';

const first: GeneralDecorators.ICallbackFn = (...args) => { void args; };
const second: GeneralDecorators.ICallbackFn = (...args) => { void args; };

const decorator = GeneralDecorators.compose([first, second]);
```
