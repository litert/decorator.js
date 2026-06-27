# Function `compose`

Create a decorator that applies multiple static method decorators in order.

Source: [`packages/library/src/modern/StaticMethodDecorators.ts#L48`](../../../../../../packages/library/src/modern/StaticMethodDecorators.ts#L48)

[TOC]

## Import

```ts
import { StaticMethods } from '@litert/decorator';
import { StaticMethods as StaticMethodsFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticMethods.compose()`.

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
import { StaticMethods } from '@litert/decorator';

const first: StaticMethods.ICallbackFn = (...args) => { void args; };
const second: StaticMethods.ICallbackFn = (...args) => { void args; };

const decorator = StaticMethods.compose([first, second]);
```
