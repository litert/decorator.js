import $Decorators from '../lib';
import 'reflect-metadata';

$Decorators.hookNativeReflectMetadata();

const mark = $Decorators.createGeneralDecorator({
    property() {},
    method() {},
    class() {}
});

class B {}

@mark
class A {

    @Reflect.metadata('name', '_a')
    private _a!: B;

    @mark
    public a(v: string): string { return '321'; }

    public b(d: B): B { return this._a; }

    @mark
    public c(): number { return 321; }

}

$Decorators.hookNativeReflectMetadata(false);

console.log($Decorators.getOwnMethodNames(A));
console.log($Decorators.getOwnPropertyNames(A));
