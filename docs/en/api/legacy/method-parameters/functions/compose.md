# Function `compose`

Create a decorator that applies multiple method parameter decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/MethodParameterDecorators.ts#L118`](../../../../../../packages/library/src/legacy/MethodParameterDecorators.ts#L118)

[TOC]

## Import

```ts
import { MethodParameters } from '@litert/decorator/legacy';
```

Access this function as `MethodParameters.compose()`.

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
import { MethodParameters } from '@litert/decorator/legacy';

const first: MethodParameters.ICallbackFn = (...args) => { void args; };
const second: MethodParameters.ICallbackFn = (...args) => { void args; };

const decorator = MethodParameters.compose([first, second]);
```
