# Modern Decorators

[TOC]

## Goal

Create a standard TypeScript method decorator that validates its application
target and contributes to class metadata without accessing the class constructor.

## Implementation

```ts
import {
    Methods,
    getMetadataContainer,
} from '@litert/decorator';

function route(path: string): Methods.ICallbackFn {

    return Methods.withArgsCheck((_method, ctx) => {
        ctx.metadata!['route:' + String(ctx.name)] = path;
    });
}

class Controller {

    @route('/users')
    public listUsers(): void {}
}

const metadata = getMetadataContainer(Controller);
console.log(metadata.get('route:listUsers'));
```

## Example code

| Decorator kind | Example |
| --- | --- |
| Class | [`Class.ts`](../../../packages/examples/modern/src/Modern/Class.ts) |
| Method | [`Method.ts`](../../../packages/examples/modern/src/Modern/Method.ts) |
| Property | [`Property.ts`](../../../packages/examples/modern/src/Modern/Property.ts) |
| Accessor | [`Accessor.ts`](../../../packages/examples/modern/src/Modern/Accessor.ts) |
| Getter | [`Getter.ts`](../../../packages/examples/modern/src/Modern/Getter.ts) |
| Setter | [`Setter.ts`](../../../packages/examples/modern/src/Modern/Setter.ts) |
| Static method | [`StaticMethod.ts`](../../../packages/examples/modern/src/Modern/StaticMethod.ts) |
| Static property | [`StaticProperty.ts`](../../../packages/examples/modern/src/Modern/StaticProperty.ts) |
| Static accessor | [`StaticAccessor.ts`](../../../packages/examples/modern/src/Modern/StaticAccessor.ts) |
| Static getter | [`StaticGetter.ts`](../../../packages/examples/modern/src/Modern/StaticGetter.ts) |
| Static setter | [`StaticSetter.ts`](../../../packages/examples/modern/src/Modern/StaticSetter.ts) |

## Notes

| Step | Reason |
| --- | --- |
| Use `Methods.withArgsCheck` | The generated decorator throws when applied to the wrong kind of element. |
| Write to `ctx.metadata` | Modern member decorators do not receive the owning class constructor or prototype. The metadata object is the shared class configuration container. |
| Read through `getMetadataContainer` | Application code can read the completed class metadata after the class has been defined. |

For larger decorators, prefer a single metadata key that stores a structured
class configuration object. Let class, instance member, and static member
decorators add their own entries to that object, then read the final result from
`getMetadataContainer(YourClass)`.
