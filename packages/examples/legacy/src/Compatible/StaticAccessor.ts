import 'reflect-metadata';
import { decorateStaticAccessorByCompose } from '@litert/decorator-example-compatible/lib/StaticAccessor';

class DemoGetSet {

    @decorateStaticAccessorByCompose('staticAccessorPair')
    public static get staticAccessorPair(): string {

        return 'staticAccessor';
    }

    public static set staticAccessorPair(value: string) {

        void value;
    }
}

class DemoKeyword {

    @decorateStaticAccessorByCompose('staticAccessorKeyword')
    public static accessor staticAccessorKeyword = 'staticAccessor';
}

console.log(Reflect.getMetadata('staticAccessor', DemoGetSet));
// Expected output: "legacy:static_accessor:staticAccessorPair:staticAccessorPair"
console.log(Reflect.getMetadata('staticAccessorNote', DemoGetSet));
// Expected output: "legacy:static_accessor:staticAccessorPair:note:staticAccessorPair"

console.log(Reflect.getMetadata('staticAccessor', DemoKeyword));
// Expected output: "legacy:static_accessor:staticAccessorKeyword:staticAccessorKeyword"
console.log(Reflect.getMetadata('staticAccessorNote', DemoKeyword));
// Expected output: "legacy:static_accessor:staticAccessorKeyword:note:staticAccessorKeyword"
