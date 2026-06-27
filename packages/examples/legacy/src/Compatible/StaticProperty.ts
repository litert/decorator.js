import 'reflect-metadata';
import { decorateStaticPropertyByCompose } from '@litert/decorator-example-compatible/lib/StaticProperty';

class Demo {

    @decorateStaticPropertyByCompose('staticPropertyValue')
    public static staticPropertyValue = 'staticProperty';
}

console.log(Reflect.getMetadata('staticProperty', Demo));
// Expected output: "legacy:static_property:staticPropertyValue:staticPropertyValue"
console.log(Reflect.getMetadata('staticPropertyNote', Demo));
// Expected output: "legacy:static_property:staticPropertyValue:note:staticPropertyValue"
