# LiteRT/Decorator 库使用说明

`@litert/decorator` 库是一个 TypeScript 的装饰器工具包，提供了大量的工具方法用以提高装饰器的开发效率。

> 关于装饰器的使用，可阅读 [《官方文档：装饰器》](https://saul-mirone.github.io/zh-hans/a-complete-guide-to-typescript-decorator/) 和 [《TypeScript装饰器完全指南》](https://www.typescriptlang.org/docs/handbook/decorators.html)。

## TypeScript 装饰器类型

目前 TypeScript 支持如下类型的装饰器：

- 类装饰器
- 类构造函数参数装饰器
- 类成员属性装饰
- 类成员方法装饰
- 类成员方法参数装饰器
- 类成员访问器装饰器
- 类静态属性装饰
- 类静态方法装饰
- 类静态方法参数装饰器
- 类静态访问器装饰器

## 安装

```sh
npm i @litert/decorator -S
```

## 引入库

```ts
import $Decorators from '@litert/decorator';
```

通过 TypeScript 的 default 引入的 `$Decorators` 是一个 `IDecoratorUtility` 类型的对象，提供各种工具方法。

## API 文档

[点击查看](./API.md)

## 使用方式

### 类装饰器

#### 1. 自行实现

```ts
import $Decorators, { IClassDecorator } from '@litert/decorator';

const classDecorator: IClassDecorator = function(clsCtor): void {

    if (!$Decorators.isInsideClassDecorator([clsCtor])) {

        throw new TypeError('Invalid parameters for class decorator.');
    }

    console.log(`Decorated class ${clsCtor.name}`);
};

@classDecorator
class Test {}
```

#### 2. 使用工具方法

> 使用工具方法时，会自动检测传递给装饰器的参数是否正确，以免将装饰器用在错误的位置，或者错误的调用装饰器函数。（下同）

```ts
import $Decorators from '@litert/decorator';

const classDecorator = $Decorators.createClassDecorator(function(clsCtor): void {

    console.log(`Decorated class ${clsCtor.name}`);
});

@classDecorator
class Test {}
```

查看[示例代码](../../src/examples/00-ClassDecorator.ts)。

### 方法装饰器

#### 1. 自行实现

```ts
import $Decorators, { IMethodDecorator } from '@litert/decorator';

const methodDecorator: IMethodDecorator = function(clsProto, methodName, dtr): void {

    if (!$Decorators.isInsideMethodDecorator([clsProto, methodName, dtr])) {

        throw new TypeError('Invalid parameters for method decorator.');
    }

    console.log(`Decorated method ${clsProto.constructor.name}::${methodName}`);
};

class Test {

    @methodDecorator
    public method(): void {}
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const methodDecorator = $Decorators.createMethodDecorator(function(clsProto, methodName): void {

    console.log(`Decorated method ${clsProto.constructor.name}::${methodName}`);
});

class Test {

    @methodDecorator
    public method(): void {}
}
```

查看[示例代码](../../src/examples/01-MemberMethodDecorator.ts)。

### 属性装饰器

#### 1. 自行实现

```ts
import $Decorators, { IPropertyDecorator } from '@litert/decorator';

const propertyDecorator: IPropertyDecorator = function(clsProto, propName): void {

    if (!$Decorators.isInsidePropertyDecorator([clsProto, propName])) {

        throw new TypeError('Invalid parameters for property decorator.');
    }

    console.log(`Decorated property ${clsProto.constructor.name}::${propName}`);
};

class Test {

    @propertyDecorator
    public value = 321;
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const propertyDecorator = $Decorators.createPropertyDecorator(function(clsProto, propName): void {

    console.log(`Decorated property ${clsProto.constructor.name}::${propName}`);
});

class Test {

    @propertyDecorator
    public value = 321;
}
```

查看[示例代码](../../src/examples/02-MemberPropertyDecorator.ts)。

### 静态方法装饰器

#### 1. 自行实现

```ts
import $Decorators, { IStaticMethodDecorator } from '@litert/decorator';

const staticMethodDecorator: IStaticMethodDecorator = function(clsCtor, methodName, dtr): void {

    if (!$Decorators.isInsideStaticMethodDecorator([clsCtor, methodName, dtr])) {

        throw new TypeError('Invalid parameters for static method decorator.');
    }

    console.log(`Decorated static method ${clsCtor.name}::${methodName}`);
};

class Test {

    @staticMethodDecorator
    public static method(): void {}
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const staticMethodDecorator = $Decorators.createStaticMethodDecorator(function(clsCtor, methodName): void {

    console.log(`Decorated static method ${clsCtor.name}::${methodName}`);
});

class Test {

    @staticMethodDecorator
    public static method(): void {}
}
```

查看[示例代码](../../src/examples/04-StaticMethodDecorator.ts)。

### 静态属性装饰器

#### 1. 自行实现

```ts
import $Decorators, { IStaticPropertyDecorator } from '@litert/decorator';

const staticPropertyDecorator: IStaticPropertyDecorator = function(clsCtor, propName): void {

    if (!$Decorators.isInsideStaticPropertyDecorator([clsCtor, propName])) {

        throw new TypeError('Invalid parameters for static property decorator.');
    }

    console.log(`Decorated static property ${clsCtor.name}::${propName}`);
};

class Test {

    @staticPropertyDecorator
    public static value = 321;
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const staticPropertyDecorator = $Decorators.createStaticPropertyDecorator(function(clsCtor, propName): void {

    console.log(`Decorated static property ${clsCtor.name}::${propName}`);
});

class Test {

    @staticPropertyDecorator
    public static value = 321;
}
```

查看[示例代码](../../src/examples/05-StaticPropertyDecorator.ts)。

### 方法参数装饰器

#### 1. 自行实现

```ts
import $Decorators, { IMethodParameterDecorator } from '@litert/decorator';

const methodParamDecorator: IMethodParameterDecorator = function(clsProto, methodName, index): void {

    if (!$Decorators.isInsideMethodParameterDecorator([clsProto, methodName, index])) {

        throw new TypeError('Invalid parameters for method parameter decorator.');
    }

    console.log(`Decorated method parameter ${clsProto.constructor.name}::${methodName}[${index}]`);
};

class Test {

    public method(@methodParamDecorator v: number): void {}
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const methodParamDecorator = $Decorators.createMethodParameterDecorator(function(clsProto, methodName, index): void {

    console.log(`Decorated method parameter ${clsProto.constructor.name}::${methodName}[${index}]`);
});

class Test {

    public method(@methodParamDecorator v: number): void {}
}
```

查看[示例代码](../../src/examples/03-MemberMethodParameterDecorator.ts)。

### 静态方法参数装饰器

> 注意：**由于 TypeScript 的实现问题，导致静态的参数装饰器（在编译时）可以接受非静态的参数装饰器，但是运行时无法通过参数检查。**

#### 1. 自行实现

```ts
import $Decorators, { IStaticMethodParameterDecorator } from '@litert/decorator';

const methodParamDecorator: IStaticMethodParameterDecorator = function(clsCtor, methodName, index): void {

    if (!$Decorators.isInsideStaticMethodParameterDecorator([clsCtor, methodName, index])) {

        throw new TypeError('Invalid parameters for static method parameter decorator.');
    }

    console.log(`Decorated static method parameter ${clsCtor.name}::${methodName}[${index}]`);
};

class Test {

    public static method(@methodParamDecorator v: number): void {}
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const methodParamDecorator = $Decorators.createStaticMethodParameterDecorator(function(clsCtor, methodName, index): void {

    console.log(`Decorated static method parameter ${clsCtor.name}::${methodName}[${index}]`);
});

class Test {

    public static method(@methodParamDecorator v: number): void {}
}
```

查看[示例代码](../../src/examples/06-StaticMethodParameterDecorator.ts)。

### 构造函数参数装饰器

#### 1. 自行实现

```ts
import $Decorators, { IConstructorParameterDecorator } from '@litert/decorator';

const ctorParamDecorator: IConstructorParameterDecorator = function(clsCtor, methodName, index): void {

    if (!$Decorators.isInsideConstructorParameterDecorator([clsCtor, methodName, index])) {

        throw new TypeError('Invalid parameters for constructor parameter decorator.');
    }

    console.log(`Decorated constructor parameter ${clsCtor.name}::constructor[${index}]`);
};

class Test {

    public constructor(@ctorParamDecorator v: number) {}
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const ctorParamDecorator = $Decorators.createConstructorParameterDecorator(function(clsCtor, methodName, index): void {

    console.log(`Decorated constructor parameter ${clsCtor.name}::constructor[${index}]`);
});

class Test {

    public constructor(@ctorParamDecorator v: number) {}
}
```

查看[示例代码](../../src/examples/07-ConstructorParameterDecorator.ts)。

### 访问器装饰器

访问器装饰器是指对 getter/setter 的装饰器。

> 需要注意的是，虽然 TypeScript 在语法上允许 **Setter 参数装饰器**，但实际上不会生效。
> 因此并不存在 **Setter 参数装饰器** 和 **静态 Setter 参数装饰器**。

> 此外，**访问器装饰器**的函数签名与**方法装饰器**一致，因此千万注意切莫用错了地方。

#### 1. 自行实现

```ts
import $Decorators, { IMethodDecorator } from '@litert/decorator';

const accessorDecorator: IMethodDecorator = function(clsProto, accessorName, dtr): void {

    if (!$Decorators.isInsideAccessorDecorator([clsProto, accessorName, dtr])) {

        throw new TypeError('Invalid parameters for accessor decorator.');
    }

    console.log(`Decorated accessor ${clsProto.constructor.name}::${accessorName}`);
};

class Test {

    @accessorDecorator
    public get value(): number { return 123; }

    @accessorDecorator
    public set price(v: number) { /* do something */ }
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const accessorDecorator = $Decorators.createAccessorDecorator(function(clsProto, accessorName): void {

    console.log(`Decorated accessor ${clsProto.constructor.name}::${accessorName}`);
});

class Test {

    @accessorDecorator
    public get value(): number { return 123; }

    @accessorDecorator
    public set price(v: number) { /* do something */ }
}
```

查看[示例代码](../../src/examples/10-AccessorDecorator.ts)。

### 静态访问器装饰器

#### 1. 自行实现

```ts
import $Decorators, { IStaticMethodDecorator } from '@litert/decorator';

const accessorDecorator: IStaticMethodDecorator = function(clsCtor, accessorName, dtr): void {

    if (!$Decorators.isInsideStaticAccessorDecorator([clsCtor, accessorName, dtr])) {

        throw new TypeError('Invalid parameters for static accessor decorator.');
    }

    console.log(`Decorated static accessor ${clsCtor.name}::${accessorName}`);
};

class Test {

    @accessorDecorator
    public static get value(): number { return 123; }

    @accessorDecorator
    public static set price(v: number) { /* do something */ }
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const accessorDecorator = $Decorators.createStaticAccessorDecorator(function(clsCtor, accessorName): void {

    console.log(`Decorated static accessor ${clsCtor.name}::${accessorName}`);
});

class Test {

    @accessorDecorator
    public static get value(): number { return 123; }

    @accessorDecorator
    public static set price(v: number) { /* do something */ }
}
```

查看[示例代码](../../src/examples/11-StaticAccessorDecorator.ts)。

### 通用装饰器

通用装饰器是指一个装饰器可以（在语法上）适配所有可装饰点，这种装饰器需要在装饰器内进行装饰点的判断。

#### 1. 自行实现

```ts
import $Decorators, { IGeneralDecorator } from '@litert/decorator';

const theDecorator: IGeneralDecorator = function(clsCtor, methodName, index): void {

    if ($Decorators.isInsideConstructorParameterDecorator([clsCtor, methodName, index])) {

        console.log(`Decorated constructor parameter ${clsCtor.name}::constructor[${index}]`);
    }
    else if ($Decorators.isInsideMethodParameterDecorator([clsProto, methodName, index])) {

        console.log(`Decorated member method parameter ${clsProto.constructor.name}::constructor[${index}]`);
    }
    else {

        // 其它装饰情况。
    }
};

class Test {

    public constructor(@theDecorator v: number) {}

    public static staticMethod(@theDecorator v: number): void {}
}
```

#### 2. 使用工具方法

```ts
import $Decorators from '@litert/decorator';

const theDecorator = $Decorators.createGeneralDecorator({

    'ctorParameter': function(clsCtor, methodName, index): void {

        console.log(`Decorated constructor parameter ${clsCtor.name}::constructor[${index}]`);
    },

    'staticMethodParameter': function(clsCtor, methodName, index): void {

        console.log(`Decorated static method parameter ${clsCtor.name}::${methodName}[${index}]`);
    }
});

class Test {

    public constructor(@theDecorator v: number) {}

    public static staticMethod(@theDecorator v: number): void {}
}
```

查看[示例代码](../../src/examples/08-GeneralDecorator.ts)。
