# Function `compose`

Create a decorator that applies multiple method decorators in order.

Source: [`packages/library/src/modern/MethodDecorators.ts#L48`](../../../../../../packages/library/src/modern/MethodDecorators.ts#L48)

[TOC]

## Import

```ts
import { Methods } from '@litert/decorator';
import { Methods as MethodsFromModern } from '@litert/decorator/modern';
```

Access this function as `Methods.compose()`.

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
import { Methods } from '@litert/decorator';

const first: Methods.ICallbackFn = (...args) => { void args; };
const second: Methods.ICallbackFn = (...args) => { void args; };

const decorator = Methods.compose([first, second]);
```
