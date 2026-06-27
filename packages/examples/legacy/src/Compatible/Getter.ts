import 'reflect-metadata';
import { decorateGetterByCompose } from '@litert/decorator-example-compatible/lib/Getter';

class Demo {

    @decorateGetterByCompose('getterValue')
    public get getterValue(): string {

        return 'getter';
    }
}

console.log(Reflect.getMetadata('getter', Demo));
// Expected output: "legacy:getter:getterValue:getterValue"
console.log(Reflect.getMetadata('getterNote', Demo));
// Expected output: "legacy:getter:getterValue:note:getterValue"
