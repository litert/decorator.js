import { decorateStaticSetterByCompose } from '@litert/decorator-example-compatible/lib/StaticSetter';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateStaticSetterByCompose('staticSetterValue')
    public static set staticSetterValue(value: string) {

        void value;
    }
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('staticSetter')); // Expected output: "modern:setter:staticSetterValue:staticSetterValue"
console.log(meta.get('staticSetterNote'));
// Expected output: "modern:setter:staticSetterValue:note:staticSetterValue"
