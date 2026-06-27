# Typings - Modern

These TypeScript declarations describe the public contracts exported by Modern.

[TOC]

## Import

```ts
import type * as Decorators from '@litert/decorator';
```

or

```ts
import type * as Decorators from '@litert/decorator/modern';
```

## Interface `IClassMetadataContainer`

The interface for the metadata container objects.

Source: [`packages/library/src/modern/Metadata.ts#L42`](../../../../packages/library/src/modern/Metadata.ts#L42)

### Definition

```ts
export interface IClassMetadataContainer {

    /**
     * Get the metadata value by the key.
     *
     * @param key  The metadata key, could be a string or a symbol.
     * @returns The metadata value for the key, or `undefined` if not exists.
     */
    get(key: string | symbol): any;

    /**
     * Set the metadata value for the key. If the key already exists, the
     * existing value will be overwritten.
     *
     * @param key  The metadata key, could be a string or a symbol.
     * @param value The metadata value to set.
     */
    set(key: string | symbol, value: any): void;

    /**
     * Check if the metadata key exists or not.
     *
     * @param key   The metadata key, could be a string or a symbol.
     * @returns `true` if the metadata key exists, or `false` if not exists.
     */
    has(key: string | symbol): boolean;

    /**
     * Remove the metadata key and its value from the container. If the key does
     * not exist, this method does nothing.
     *
     * @param key  The metadata key, could be a string or a symbol.
     */
    remove(key: string | symbol): void;
}
```

---

## Type Alias `IConstructor`

Constructor helper type re-exported from `@litert/utils-ts-types` for decorator callback typings.

Source: [`packages/library/src/modern/index.ts#L17`](../../../../packages/library/src/modern/index.ts#L17)

### Definition

```ts
export type { IConstructor } from '@litert/utils-ts-types';
```

---

## Type Alias `IInstanceOf`

Instance helper type re-exported from `@litert/utils-ts-types` for decorator callback typings.

Source: [`packages/library/src/modern/index.ts#L17`](../../../../packages/library/src/modern/index.ts#L17)

### Definition

```ts
export type { IInstanceOf } from '@litert/utils-ts-types';
```
