import { decorateStaticMethodByCompose } from '@litert/decorator-example-compatible/lib/StaticMethod';
import { getMetadataContainer } from '@litert/decorator/compatible';

class Demo {

    @decorateStaticMethodByCompose('staticMethodValue')
    public static staticMethodValue(): void {
    }
}

const meta = getMetadataContainer(Demo);

console.log(meta.get('staticMethod')); // Expected output: "modern:method:staticMethodValue:staticMethodValue"
console.log(meta.get('staticMethodNote'));
// Expected output: "modern:method:staticMethodValue:note:staticMethodValue"
