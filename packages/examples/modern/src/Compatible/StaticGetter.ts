import { decorateStaticGetterByCompose } from '@litert/decorator-example-compatible/lib/StaticGetter';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateStaticGetterByCompose('staticGetterValue')
    public static get staticGetterValue(): string {

        return 'staticGetter';
    }
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('staticGetter')); // Expected output: "modern:getter:staticGetterValue:staticGetterValue"
console.log(meta.get('staticGetterNote'));
// Expected output: "modern:getter:staticGetterValue:note:staticGetterValue"
