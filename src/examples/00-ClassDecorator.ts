/**
 * Copyright 2023 Angus.Fenying <fenying@litert.org>
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


@$Decorators.composite([
    $Decorators.createClassDecorator((ctor) => console.log(`3. Class name before secord decorated: ${ctor.name}`)),
    $Decorators.createClassDecorator((ctor) => (class Test2 extends ctor {

        public name: string = 'Mick';

        public printName(): void {

            console.log(this.name);
        }
    })),
    $Decorators.createClassDecorator((ctor) => console.log(`4. Class name after secord decorated: ${ctor.name}`)),
    $Decorators.createClassDecorator((ctor) => console.log(Object.getOwnPropertyNames(ctor.prototype))),
])
@$Decorators.createClassDecorator((ctor) => console.log(`2. Class name after first decorated: ${ctor.name}`))
@$Decorators.createClassDecorator((ctor) => (class Test1 extends ctor {

    public age: number = 312;

    public printAge(): void {

        console.log(this.age);
    }
}))
@$Decorators.createClassDecorator((ctor) => console.log(`1. Class name before decorated: ${ctor.name}`))
class DemoClassDecorator {

}

console.log(`Final class: ${DemoClassDecorator.name}`);
