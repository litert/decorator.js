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

import $Decorators, { IClassCtor, IPrototype } from '../lib';

class DemoStaticMethodParameterDecorator {

    public test(
        @$Decorators.createMethodParameterDecorator(
            function(proto: IPrototype, name: string | symbol, index: number): void {
                console.log(`Decorated method parameter ${proto.constructor.name}::${name as string}[${index}]`);
            }
        )
        v: number
    ): void {

        console.log(`Test: ${v}`);
    }

    public static staticTest(
        @$Decorators.createStaticMethodParameterDecorator(
            function(ctor: IClassCtor, name: string | symbol, index: number): void {
                console.log(`Decorated static method parameter ${ctor.name}::${name as string}[${index}]`);
            }
        )
        v: number
    ): void {

        console.log(`Static Test: ${v}`);
    }
}

new DemoStaticMethodParameterDecorator().test(123);
DemoStaticMethodParameterDecorator.staticTest(321);
