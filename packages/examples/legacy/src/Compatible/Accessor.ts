import 'reflect-metadata';
import { decorateAccessorByCompose } from '@litert/decorator-example-compatible/lib/Accessor';

class DemoGetSet {

    @decorateAccessorByCompose('accessorPair')
    public get accessorPair(): string {

        return 'accessor';
    }

    public set accessorPair(value: string) {

        void value;
    }
}

class DemoKeyword {

    @decorateAccessorByCompose('accessorKeyword')
    public accessor accessorKeyword = 'accessor';
}

console.log(Reflect.getMetadata('accessor', DemoGetSet));
// Expected output: "legacy:accessor:accessorPair:accessorPair"
console.log(Reflect.getMetadata('accessorNote', DemoGetSet));
// Expected output: "legacy:accessor:accessorPair:note:accessorPair"

console.log(Reflect.getMetadata('accessor', DemoKeyword));
// Expected output: "legacy:accessor:accessorKeyword:accessorKeyword"
console.log(Reflect.getMetadata('accessorNote', DemoKeyword));
// Expected output: "legacy:accessor:accessorKeyword:note:accessorKeyword"
