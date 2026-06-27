# Function `create`

Create a general decorator function with the specified usage cases.

Using this function, you can create a decorator that can be used as the
specific decorator type in of the following cases (at least one):

- Class decorator
- (Static) Accessor decorator
- (Static) Getter decorator
- (Static) Setter decorator
- (Static) Method decorator
- (Static) Property decorator
- (Static) Method parameter decorator
- Constructor parameter decorator

For accessor-like decorators, the generated decorator dispatches with this
applying priority: accessor > getter == setter. The same priority rule
applies to static accessor, static getter, and static setter decorators.

Source: [`packages/library/src/legacy/GeneralDecorators.ts#L398`](../../../../../../packages/library/src/legacy/GeneralDecorators.ts#L398)

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';
```

Access this function as `GeneralDecorators.create()`.

## Signature

```ts
export function create(opts: IGeneralDecoratorOptions): tLoc.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The options to specify the usage cases of the general decorator.

## Return Value

A general decorator function.

## Examples

```ts
import { GeneralDecorators } from '@litert/decorator/legacy';

const decorator = GeneralDecorators.create({
    onMethod: (method, ctx) => {
        void method;
        void ctx;
    },
});
```
