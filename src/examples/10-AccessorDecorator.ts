/**
 * Copyright 2021 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import $Decorators from '../lib';

const mark = $Decorators.createAccessorDecorator(function(proto, name, dtr): void {

    if (dtr.get && dtr.set) {
        console.log(`Decorated accessor ${proto.constructor.name}::${name as string}.`);
    }
    else if (dtr.get) {
        console.log(`Decorated getter ${proto.constructor.name}::${name as string}.`);
    }
    else if (dtr.set) {
        console.log(`Decorated setter ${proto.constructor.name}::${name as string}.`);
    }
});

class AccessorDecoratorDemo {

    @mark
    public get a(): number { return 123; }

    @mark
    public set b(v: number) {  }

    @mark
    public get c(): number { return 123; }

    public set c(v: number) {  }
}

new AccessorDecoratorDemo();
