import 'reflect-metadata';
import { decorateClassByCompose } from '@litert/decorator-example-compatible/lib/Class';

@decorateClassByCompose('classValue')
class Demo {

}

console.log(Reflect.getMetadata('class', Demo));
// Expected output: "legacy:class:Demo:classValue"
console.log(Reflect.getMetadata('classNote', Demo));
// Expected output: "legacy:class:Demo:note:classValue"
