import { decorateClassByCompose } from '@litert/decorator-example-compatible/lib/Class';
import { getMetadataContainer } from '@litert/decorator/compatible';

@decorateClassByCompose('classValue')
class Demo {

}

const meta = getMetadataContainer(Demo);

console.log(meta.get('class')); // Expected output: "modern:class:Demo:classValue"
console.log(meta.get('classNote')); // Expected output: "modern:class:Demo:note:classValue"
