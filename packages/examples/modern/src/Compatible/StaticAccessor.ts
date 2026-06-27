import { decorateStaticAccessorByCompose } from '@litert/decorator-example-compatible/lib/StaticAccessor';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateStaticAccessorByCompose('staticAccessorValue')
    public static accessor staticAccessorValue = 'staticAccessor';
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('staticAccessor')); // Expected output: "modern:accessor:staticAccessorValue:staticAccessorValue"
console.log(meta.get('staticAccessorNote'));
// Expected output: "modern:accessor:staticAccessorValue:note:staticAccessorValue"
