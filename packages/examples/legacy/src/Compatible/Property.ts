import 'reflect-metadata';
import { decoratePropertyByCompose } from '@litert/decorator-example-compatible/lib/Property';

class Demo {

    @decoratePropertyByCompose('propertyValue')
    public propertyValue = 'property';
}

console.log(Reflect.getMetadata('property', Demo));
// Expected output: "legacy:property:propertyValue:propertyValue"
console.log(Reflect.getMetadata('propertyNote', Demo));
// Expected output: "legacy:property:propertyValue:note:propertyValue"
