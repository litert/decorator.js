# Function `compose`

Create a decorator that applies multiple property decorators in order.

Source: [`packages/library/src/modern/PropertyDecorators.ts#L45`](../../../../../../packages/library/src/modern/PropertyDecorators.ts#L45)

[TOC]

## Import

```ts
import { Properties } from '@litert/decorator';
import { Properties as PropertiesFromModern } from '@litert/decorator/modern';
```

Access this function as `Properties.compose()`.

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
import { Properties } from '@litert/decorator';

const first: Properties.ICallbackFn = (...args) => { void args; };
const second: Properties.ICallbackFn = (...args) => { void args; };

const decorator = Properties.compose([first, second]);
```
