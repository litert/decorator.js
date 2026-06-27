import 'reflect-metadata';
import { decorateSetterByCompose } from '@litert/decorator-example-compatible/lib/Setter';

class Demo {

    @decorateSetterByCompose('setterValue')
    public set setterValue(value: string) {

        void value;
    }
}

console.log(Reflect.getMetadata('setter', Demo));
// Expected output: "legacy:setter:setterValue:setterValue"
console.log(Reflect.getMetadata('setterNote', Demo));
// Expected output: "legacy:setter:setterValue:note:setterValue"
