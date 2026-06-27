import { decorateSetterByCompose } from '@litert/decorator-example-compatible/lib/Setter';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateSetterByCompose('setterValue')
    public set setterValue(value: string) {

        void value;
    }
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('setter')); // Expected output: "modern:setter:setterValue:setterValue"
console.log(meta.get('setterNote'));
// Expected output: "modern:setter:setterValue:note:setterValue"
