# Function `compose`

Create a compatible decorator that applies multiple class decorators
in order.

Source: [`packages/library/src/compatible/ClassDecorators.ts#L143`](../../../../../../packages/library/src/compatible/ClassDecorators.ts#L143)

[TOC]

## Import

```ts
import { Classes } from '@litert/decorator/compatible';
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

A decorator callback that supports both legacy and modern transforms.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { Classes } from '@litert/decorator/compatible';

const first: Classes.ICallbackFn = (...args) => { void args; };
const second: Classes.ICallbackFn = (...args) => { void args; };

const decorator = Classes.compose([first, second]);
```
