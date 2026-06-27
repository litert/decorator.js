# Function `compose`

Create a decorator that applies multiple accessor decorators in order.

Source: [`packages/library/src/modern/AccessorDecorators.ts#L48`](../../../../../../packages/library/src/modern/AccessorDecorators.ts#L48)

[TOC]

## Import

```ts
import { Accessors } from '@litert/decorator';
import { Accessors as AccessorsFromModern } from '@litert/decorator/modern';
```

Access this function as `Accessors.compose()`.

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
import { Accessors } from '@litert/decorator';

const first: Accessors.ICallbackFn = (...args) => { void args; };
const second: Accessors.ICallbackFn = (...args) => { void args; };

const decorator = Accessors.compose([first, second]);
```
