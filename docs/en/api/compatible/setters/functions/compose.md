# Function `compose`

Create a compatible decorator that applies multiple setter decorators
in order.

Source: [`packages/library/src/compatible/SetterDecorators.ts#L122`](../../../../../../packages/library/src/compatible/SetterDecorators.ts#L122)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator/compatible';
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

A decorator callback that supports both legacy and modern transforms.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { Setters } from '@litert/decorator/compatible';

const first: Setters.ICallbackFn = (...args) => { void args; };
const second: Setters.ICallbackFn = (...args) => { void args; };

const decorator = Setters.compose([first, second]);
```
