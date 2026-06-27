import 'reflect-metadata';
import { decorateStaticMethodByCompose } from '@litert/decorator-example-compatible/lib/StaticMethod';

class Demo {

    @decorateStaticMethodByCompose('staticMethodValue')
    public static staticMethodValue(): void {
    }
}

console.log(Reflect.getMetadata('staticMethod', Demo));
// Expected output: "legacy:static_method:staticMethodValue:staticMethodValue"
console.log(Reflect.getMetadata('staticMethodNote', Demo));
// Expected output: "legacy:static_method:staticMethodValue:note:staticMethodValue"
