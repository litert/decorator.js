# Function `getMetadataContainer`

Get the metadata container of a class by its constructor. The metadata
container is an object that stores metadata for a determined class.

The metadata container object will be created if it does not exist.

> [!IMPORTANT]
>
> This API is designed for **modern (Stage 3) decorators**
> only. For legacy (Stage 2 / experimental) decorators, use the
> [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) module
> with `Reflect.defineMetadata()` and `Reflect.getMetadata()` instead.
>
> See the [Legacy Decorators tutorial](../../../tutorials/legacy-decorators.md)
> for an example of metadata with legacy decorators.

Source: [`packages/library/src/modern/Metadata.ts#L118`](../../../../../packages/library/src/modern/Metadata.ts#L118)

[TOC]

## Import

```ts
import { getMetadataContainer } from '@litert/decorator';
```

## Signature

```ts
export function getMetadataContainer(
    ctor: tC.IConstructor,
): IClassMetadataContainer;
```

## Parameters

- Parameter `ctor`

  The class constructor.

## Return Value

The metadata container object.

## Examples

```ts
import { getMetadataContainer } from '@litert/decorator';

class Example {}

const metadata = getMetadataContainer(Example);
metadata.set('role', 'demo');
console.log(metadata.get('role'));
```
