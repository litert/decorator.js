# Typings - Compatible

These TypeScript declarations describe the public contracts exported by Compatible.

[TOC]

## Import

```ts
import type * as Decorators from '@litert/decorator/compatible';
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
