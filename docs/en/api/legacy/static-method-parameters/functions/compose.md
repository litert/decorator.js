# Function `compose`

Create a decorator that applies multiple static method parameter decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/StaticMethodParameterDecorators.ts#L109`](../../../../../../packages/library/src/legacy/StaticMethodParameterDecorators.ts#L109)

[TOC]

## Import

```ts
import { StaticMethodParameters } from '@litert/decorator/legacy';
```

Access this function as `StaticMethodParameters.compose()`.

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
import { StaticMethodParameters } from '@litert/decorator/legacy';

const first: StaticMethodParameters.ICallbackFn = (...args) => { void args; };
const second: StaticMethodParameters.ICallbackFn = (...args) => { void args; };

const decorator = StaticMethodParameters.compose([first, second]);
```
