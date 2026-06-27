import { decoratePropertyByCompose } from '@litert/decorator-example-compatible/lib/Property';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decoratePropertyByCompose('propertyValue')
    public propertyValue = 'property';
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('property')); // Expected output: "modern:field:propertyValue:propertyValue"
console.log(meta.get('propertyNote'));
// Expected output: "modern:field:propertyValue:note:propertyValue"
