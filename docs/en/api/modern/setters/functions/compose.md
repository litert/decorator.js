# Function `compose`

Create a decorator that applies multiple setter decorators in order.

Source: [`packages/library/src/modern/SetterDecorators.ts#L48`](../../../../../../packages/library/src/modern/SetterDecorators.ts#L48)

[TOC]

## Import

```ts
import { Setters } from '@litert/decorator';
import { Setters as SettersFromModern } from '@litert/decorator/modern';
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
import { Setters } from '@litert/decorator';

const first: Setters.ICallbackFn = (...args) => { void args; };
const second: Setters.ICallbackFn = (...args) => { void args; };

const decorator = Setters.compose([first, second]);
```
