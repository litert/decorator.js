import { decorateAccessorByCompose } from '@litert/decorator-example-compatible/lib/Accessor';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateAccessorByCompose('accessorValue')
    public accessor accessorValue = 'accessor';
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('accessor')); // Expected output: "modern:accessor:accessorValue:accessorValue"
console.log(meta.get('accessorNote'));
// Expected output: "modern:accessor:accessorValue:note:accessorValue"
