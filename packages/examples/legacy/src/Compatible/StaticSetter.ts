import 'reflect-metadata';
import { decorateStaticSetterByCompose } from '@litert/decorator-example-compatible/lib/StaticSetter';

class Demo {

    @decorateStaticSetterByCompose('staticSetterValue')
    public static set staticSetterValue(value: string) {

        void value;
    }
}

console.log(Reflect.getMetadata('staticSetter', Demo));
// Expected output: "legacy:static_setter:staticSetterValue:staticSetterValue"
console.log(Reflect.getMetadata('staticSetterNote', Demo));
// Expected output: "legacy:static_setter:staticSetterValue:note:staticSetterValue"
