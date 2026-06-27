# Function `compose`

Create a decorator that applies multiple static accessor decorators in order.

Source: [`packages/library/src/modern/StaticAccessorDecorators.ts#L48`](../../../../../../packages/library/src/modern/StaticAccessorDecorators.ts#L48)

[TOC]

## Import

```ts
import { StaticAccessors } from '@litert/decorator';
import { StaticAccessors as StaticAccessorsFromModern } from '@litert/decorator/modern';
```

Access this function as `StaticAccessors.compose()`.

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
import { StaticAccessors } from '@litert/decorator';

const first: StaticAccessors.ICallbackFn = (...args) => { void args; };
const second: StaticAccessors.ICallbackFn = (...args) => { void args; };

const decorator = StaticAccessors.compose([first, second]);
```
