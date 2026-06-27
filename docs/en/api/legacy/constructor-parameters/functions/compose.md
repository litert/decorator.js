# Function `compose`

Create a decorator that applies multiple constructor parameter decorators in order.

> [!WARNING]
> This is an outdated ECMAScript decorators proposal.

Source: [`packages/library/src/legacy/ConstructorParameterDecorators.ts#L101`](../../../../../../packages/library/src/legacy/ConstructorParameterDecorators.ts#L101)

[TOC]

## Import

```ts
import { ConstructorParameters } from '@litert/decorator/legacy';
```

Access this function as `ConstructorParameters.compose()`.

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
import { ConstructorParameters } from '@litert/decorator/legacy';

const first: ConstructorParameters.ICallbackFn = (...args) => { void args; };
const second: ConstructorParameters.ICallbackFn = (...args) => { void args; };

const decorator = ConstructorParameters.compose([first, second]);
```
