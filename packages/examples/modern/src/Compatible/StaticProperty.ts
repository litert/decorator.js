import { decorateStaticPropertyByCompose } from '@litert/decorator-example-compatible/lib/StaticProperty';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateStaticPropertyByCompose('staticPropertyValue')
    public static staticPropertyValue = 'staticProperty';
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('staticProperty')); // Expected output: "modern:field:staticPropertyValue:staticPropertyValue"
console.log(meta.get('staticPropertyNote'));
// Expected output: "modern:field:staticPropertyValue:note:staticPropertyValue"
