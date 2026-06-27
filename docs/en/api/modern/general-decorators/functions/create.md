# Function `create`

Create a general decorator function with the specified usage cases.

Using this function, you can create a decorator that can be used as the
specific decorator type in of the following cases (at least one):

- Class decorator
- (Static) Method decorator
- (Static) Property decorator
- (Static) Accessor decorator
- (Static) Getter decorator
- (Static) Setter decorator

Source: [`packages/library/src/modern/GeneralDecorators.ts#L245`](../../../../../../packages/library/src/modern/GeneralDecorators.ts#L245)

[TOC]

## Import

```ts
import { GeneralDecorators } from '@litert/decorator';
import { GeneralDecorators as GeneralDecoratorsFromModern } from '@litert/decorator/modern';
```

Access this function as `GeneralDecorators.create()`.

## Signature

```ts
export function create(
    opts: IGeneralDecoratorOptions,
): tMod.ICallbackFn;
```

## Parameters

- Parameter `opts`

  The options to specify the usage cases of the general decorator.

## Return Value

A general decorator function.

## Error Handling

- `TypeError` - If no usage case is specified in the options.

## Examples

```ts
import { GeneralDecorators } from '@litert/decorator';

const decorator = GeneralDecorators.create({
    onMethod: (method, ctx) => {
        void method;
        void ctx;
    },
});
```
