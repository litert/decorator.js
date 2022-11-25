/**
 * Copyright 2022 Angus.Fenying <fenying@litert.org>
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

import $Decorators, { IClassCtor, IPrototype } from '../lib';

class DemoStaticPropertyDecorator {

    @$Decorators.createPropertyDecorator(function(proto: IPrototype, name: string | symbol) {
        console.log(`Decorated property ${proto.constructor.name}::${name as string}`);
    })
    public value: number = 321;

    @$Decorators.createStaticPropertyDecorator(function(ctor: IClassCtor, name: string | symbol) {
        console.log(`Decorated static property ${ctor.name}::${name as string}`);
    })
    public static staticValue: number = 123;

    @$Decorators.createStaticAccessorDecorator(function(proto: IClassCtor, name: string | symbol) {
        console.log(`Decorated static setter ${proto.constructor.name}::${name as string}`);
    })
    public static set v(a: number) {

        console.log(a);
    }
}

console.log(`Member value: ${new DemoStaticPropertyDecorator().value}`);
console.log(`Static value: ${DemoStaticPropertyDecorator.staticValue}`);
