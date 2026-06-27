import 'reflect-metadata';
import { decorateStaticGetterByCompose } from '@litert/decorator-example-compatible/lib/StaticGetter';

class Demo {

    @decorateStaticGetterByCompose('staticGetterValue')
    public static get staticGetterValue(): string {

        return 'staticGetter';
    }
}

console.log(Reflect.getMetadata('staticGetter', Demo));
// Expected output: "legacy:static_getter:staticGetterValue:staticGetterValue"
console.log(Reflect.getMetadata('staticGetterNote', Demo));
// Expected output: "legacy:static_getter:staticGetterValue:note:staticGetterValue"
