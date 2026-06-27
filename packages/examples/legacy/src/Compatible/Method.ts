import 'reflect-metadata';
import { decorateMethodByCompose } from '@litert/decorator-example-compatible/lib/Method';

class Demo {

    @decorateMethodByCompose('methodValue')
    public methodValue(): void {
    }
}

console.log(Reflect.getMetadata('method', Demo));
// Expected output: "legacy:method:methodValue:methodValue"
console.log(Reflect.getMetadata('methodNote', Demo));
// Expected output: "legacy:method:methodValue:note:methodValue"
