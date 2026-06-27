# Function `compose`

Create a general decorator that applies multiple general decorators in order.

Source: [`packages/library/src/modern/GeneralDecorators.ts#L64`](../../../../../../packages/library/src/modern/GeneralDecorators.ts#L64)

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator';
import { GeneralDecorators as GeneralDecoratorsFromModern } from '@litert/decorator/modern';
```

Access this function as `GeneralDecorators.compose()`.

## Signature

```ts
export function compose(decorators: readonly tMod.ICallbackFn[]): tMod.ICallbackFn;
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
import { GeneralDecorators } from '@litert/decorator';

const first: GeneralDecorators.ICallbackFn = (...args) => { void args; };
const second: GeneralDecorators.ICallbackFn = (...args) => { void args; };

const decorator = GeneralDecorators.compose([first, second]);
```
