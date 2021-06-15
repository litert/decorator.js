# LiteRT/Decorator API 文档

## API 篇

### createClassDecorator

```ts
function createClassDecorator(processor: IClassDecoratorProcessor): IClassDecorator;
```

这个方法用于创建一个符合 TypeScript **类装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[00-ClassDecorator.ts](../../src/examples/00-ClassDecorator.ts)

### createConstructorParameterDecorator

```ts
function createConstructorParameterDecorator(processor: IConstructorParameterDecoratorProcessor): IConstructorParameterDecorator;
```

这个方法用于创建一个符合 TypeScript **类构造函数参数装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[07-ConstructorParameterDecorator.ts](../../src/examples/07-ConstructorParameterDecorator.ts)

### createMethodDecorator

```ts
function createMethodDecorator(processor: IMethodDecoratorProcessor): IMethodDecorator;
```

这个方法用于创建一个符合 TypeScript **类成员方法装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[01-MemberMethodDecorator.ts](../../src/examples/01-MemberMethodDecorator.ts)

### createGeneralDecorator

```ts
function createGeneralDecorator(processors: IGeneralDecoratorProcessorSet): IGeneralDecorator;
```

这个方法用于创建一个符合 TypeScript **通用装饰器**签名规范的装饰器函数，其参数 `processors` 是各种装饰器的业务处理器回调函数的集合。

> `processors` 中每一种类型的装饰器业务处理器都是可选的，不传则表示创建出来的通用装饰器不能用于该类型的装饰。

> 注意：与专用装饰器不一样，**通用装饰器**无法在语法上做检查，因此只能在运行时发现使用错误。

同其它装饰器的创建方法一样，该方法也会自动对传递给 `processors` 中的回调参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[08-GeneralDecorator.ts](../../src/examples/08-GeneralDecorator.ts)

### createMethodParameterDecorator

```ts
function createMethodParameterDecorator(processor: IMethodParameterDecoratorProcessor): IMethodParameterDecorator;
```

这个方法用于创建一个符合 TypeScript **类成员方法参数装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[03-MemberMethodParameterDecorator.ts](../../src/examples/03-MemberMethodParameterDecorator.ts)

### createPropertyDecorator

```ts
function createPropertyDecorator(processor: IPropertyDecoratorProcessor): IPropertyDecorator;
```

这个方法用于创建一个符合 TypeScript **类成员属性装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[02-MemberPropertyDecorator.ts](../../src/examples/02-MemberPropertyDecorator.ts)

### createStaticMethodDecorator

```ts
function createStaticMethodDecorator(processor: IStaticMethodDecoratorProcessor): IStaticMethodDecorator;
```

这个方法用于创建一个符合 TypeScript **类静态方法装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[04-StaticMethodDecorator.ts](../../src/examples/04-StaticMethodDecorator.ts)

### createStaticMethodParameterDecorator

```ts
function createStaticMethodParameterDecorator(processor: IStaticMethodParameterDecoratorProcessor): IStaticMethodParameterDecorator;
```

这个方法用于创建一个符合 TypeScript **类静态方法参数装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[06-StaticMethodParameterDecorator.ts](../../src/examples/06-StaticMethodParameterDecorator.ts)

### createStaticPropertyDecorator

```ts
function createStaticPropertyDecorator(processor: IStaticPropertyDecoratorProcessor): IStaticPropertyDecorator;
```

这个方法用于创建一个符合 TypeScript **类静态属性装饰器**签名规范的装饰器函数，其参数 `processor` 是装饰器的业务处理器回调函数。

该方法会自动对传递给 `processor` 回调的参数进行有效性检查，防止将装饰器用在错误的地方。

参考示例：[05-StaticPropertyDecorator.ts](../../src/examples/05-StaticPropertyDecorator.ts)

### getClassOfObject

```ts
function getClassOfObject(obj: IObject): IClassCtor;
```

这个方法用于获取给定对象所属的类（的构造函数）。

### getOwnMethodNames

```ts
function getOwnMethodNames(target: IClassCtor): Array<string | symbol>;
```

这个方法用于获取指定类中，被装饰过的方法名称列表。（不包括仅父类、子类中被装饰过，而不在当前类中被装饰过的方法）

> 该方法配合 `hookNativeReflectMetadata` 方法使用，可以获得类中所有（包括未被显式装饰过的）成员属性和成员方法的名称。

### getOwnPropertyNames

```ts
function getOwnPropertyNames(target: IClassCtor): Array<string | symbol>;
```

这个方法用于获取指定类中，被装饰过的属性名称列表。（不包括仅父类、子类中被装饰过，而不在当前类中被装饰过的属性）

> 该方法配合 `hookNativeReflectMetadata` 方法使用，可以获得类中所有（包括未被显式装饰过的）成员属性和成员方法的名称。

### getOwnStaticMethodNames

```ts
function getOwnStaticMethodNames(target: IClassCtor): Array<string | symbol>;
```

这个方法用于获取指定类中，被装饰过的静态方法名称列表。（不包括仅父类、子类中被装饰过，而不在当前类中被装饰过的方法）

> 该方法配合 `hookNativeReflectMetadata` 方法使用，可以获得类中所有（包括未被显式装饰过的）静态属性和静态方法的名称。

### getOwnStaticPropertyNames

```ts
function getOwnStaticPropertyNames(target: IClassCtor): Array<string | symbol>;
```

这个方法用于获取指定类中，被装饰过的静态属性名称列表。（不包括仅父类、子类中被装饰过，而不在当前类中被装饰过的属性）

> 该方法配合 `hookNativeReflectMetadata` 方法使用，可以获得类中所有（包括未被显式装饰过的）静态属性和静态方法的名称。

### getParentClass

```ts
function getParentClass(target: IClassCtor): IClassCtor | null;
```

这个方法用于获取指定类的父类，如果不存在则返回 `null`。

### hasParentClass

```ts
function hasParentClass(target: IClassCtor): boolean;
```

这个方法用于判断给定的类是否存在父类。

### hookNativeReflectMetadata

```ts
function hookNativeReflectMetadata(): void;
```

这个方法用于 Hook TypeScript 反射标准库 `reflect-metadata`。

> TypeScript 编译器在开启 `emitDecoratorMetadata` 选项后，会给每个（TypeScript 编译生成的）类的所有属性和方法
> 生成类型元数据，而这些元数据使用 `reflect-metadata` 库的接口进行存储。因此 `hookNativeReflectMetadata` 通过 hook
> `reflect-metadata` 库的元数据写入方法，就可以获取到每个类的所有属性和方法。

这个方法必须在 `reflect-metadata` 库被引入前使用，因此建议在程序入口处，最先引用本库，并调用该方法进行初始化：

```ts
import $Decorators from '@litert/decorator';
$Decorators.hookNativeReflectMetadata();
```

### isClassConstructor

```ts
function isClassConstructor<T extends IClassCtor>(target: unknown): target is T;
```

这个方法用于判断其输入的参数 `target` 是否为一个类的构造函数。

### isClassPrototype

```ts
function isClassPrototype<T extends IPrototype>(target: unknown): target is T;
```

这个方法用于判断其输入的参数 `target` 是否为一个类的原型链对象。

### isInsideClassDecorator

```ts
function isInsideClassDecorator(args: any[]): args is Parameters<IClassDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsideConstructorParameterDecorator

```ts
function isInsideConstructorParameterDecorator(args: any[]): args is Parameters<IConstructorParameterDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类构造函数参数装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsideMethodDecorator

```ts
function isInsideMethodDecorator(args: any[]): args is Parameters<IMethodDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类成员方法装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsideMethodParameterDecorator

```ts
function isInsideMethodParameterDecorator(args: any[]): args is Parameters<IMethodParameterDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类成员方法参数装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsidePropertyDecorator

```ts
function isInsidePropertyDecorator(args: any[]): args is Parameters<IPropertyDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类成员属性装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsideStaticMethodDecorator

```ts
function isInsideStaticMethodDecorator(args: any[]): args is Parameters<IStaticMethodDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类静态方法装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsideStaticMethodParameterDecorator

```ts
function isInsideStaticMethodParameterDecorator(args: any[]): args is Parameters<IStaticMethodParameterDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类静态方法参数装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

### isInsideStaticPropertyDecorator

```ts
function isInsideStaticPropertyDecorator(args: any[]): args is Parameters<IStaticPropertyDecorator>;
```

这个方法用于判断其输入的参数 `args` 是否为 TypeScript **类静态属性装饰器**函数的参数，可在自行实现装饰器函数的时候使用，以区分使用场景。

> 但无需在 `create***Decorator` 函数中使用，因为其已经自动调用对应的 `isInside***Decorator` 函数进行参数类型校验。

## 结构篇

### IClassCtor

该类型可以用以描述任意类的构造函数。

### IObject

该类型可以用以描述任意类型的对象，除了 `null`。

### IPrototype

该类型可以用以描述任意类的原型链对象。

### IGeneralDecorator

该类型描述 TypeScript 中，可以适配任意类型装饰器函数的函数签名。

### IClassDecorator

该类型描述 TypeScript 的**类装饰器**函数的函数签名。

### IConstructorParameterDecorator

该类型描述 TypeScript 的**类构造函数参数装饰器**函数的函数签名。

### IMethodDecorator

该类型描述 TypeScript 的**类成员方法装饰器**函数的函数签名。

### IMethodParameterDecorator

该类型描述 TypeScript 的**类成员方法参数装饰器**函数的函数签名。

### IPropertyDecorator

该类型描述 TypeScript 的**类成员属性装饰器**函数的函数签名。

### IStaticMethodDecorator

该类型描述 TypeScript 的**类静态方法装饰器**函数的函数签名。

### IStaticMethodParameterDecorator

该类型描述 TypeScript 的**类静态方法参数装饰器**函数的函数签名。

### IStaticPropertyDecorator

该类型描述 TypeScript 的**类静态属性装饰器**函数的函数签名。

### IClassDecoratorProcessor

该类型描述 TypeScript 的**类装饰器**处理器函数的函数签名。

### IConstructorParameterDecoratorProcessor

该类型描述 TypeScript 的**类构造函数参数装饰器**处理器函数的函数签名。

### IMethodDecoratorProcessor

该类型描述 TypeScript 的**类成员方法装饰器**处理器函数的函数签名。

### IMethodParameterDecoratorProcessor

该类型描述 TypeScript 的**类成员方法参数装饰器**处理器函数的函数签名。

### IPropertyDecoratorProcessor

该类型描述 TypeScript 的**类成员属性装饰器**处理器函数的函数签名。

### IStaticMethodDecoratorProcessor

该类型描述 TypeScript 的**类静态方法装饰器**处理器函数的函数签名。

### IStaticMethodParameterDecoratorProcessor

该类型描述 TypeScript 的**类静态方法参数装饰器**处理器函数的函数签名。

### IStaticPropertyDecoratorProcessor

该类型描述 TypeScript 的**类静态属性装饰器**处理器函数的函数签名。
