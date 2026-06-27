import { decorateMethodByCompose } from '@litert/decorator-example-compatible/lib/Method';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateMethodByCompose('methodValue')
    public methodValue(): void {
    }
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('method')); // Expected output: "modern:method:methodValue:methodValue"
console.log(meta.get('methodNote'));
// Expected output: "modern:method:methodValue:note:methodValue"
