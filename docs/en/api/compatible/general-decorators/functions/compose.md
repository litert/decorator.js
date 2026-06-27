# Function `compose`

Create a compatible general decorator that applies multiple general
decorators in order.

Source: [`packages/library/src/compatible/GeneralDecorators.ts#L169`](../../../../../../packages/library/src/compatible/GeneralDecorators.ts#L169)

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';
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

A general decorator callback that supports both decorator transforms.

## Error Handling

- `TypeError` - If the decorators list is empty or contains non-functions.

## Examples

```ts
import { GeneralDecorators } from '@litert/decorator/compatible';

const first: GeneralDecorators.ICallbackFn = (...args) => { void args; };
const second: GeneralDecorators.ICallbackFn = (...args) => { void args; };

const decorator = GeneralDecorators.compose([first, second]);
```
