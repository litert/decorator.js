import { decorateGetterByCompose } from '@litert/decorator-example-compatible/lib/Getter';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateGetterByCompose('getterValue')
    public get getterValue(): string {

        return 'getter';
    }
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('getter')); // Expected output: "modern:getter:getterValue:getterValue"
console.log(meta.get('getterNote'));
// Expected output: "modern:getter:getterValue:note:getterValue"
