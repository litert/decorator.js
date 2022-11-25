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

import $Decorators from '../lib';

const test = $Decorators.createGeneralDecorator({
    class(c): void {

        console.log(`Decorated class ${c.name}`);
    },
    ctorParameter(c, i): void {

        console.log(`Decorated class ${c.name}'s constructor parameters[${i}]`);
    },
    property(c, n): void {

        console.log(`Decorated class ${c.constructor.name}'s member property "${n as string}"`);
    },
    staticProperty(c, n): void {

        console.log(`Decorated class ${c.name}'s static property "${n as string}"`);
    },
    method(c, n): void {

        console.log(`Decorated class ${c.constructor.name}'s member method "${n as string}"`);
    },
    staticMethod(c, n): void {

        console.log(`Decorated class ${c.name}'s static method "${n as string}"`);
    },
    methodParameter(c, n, i): void {

        console.log(`Decorated class ${c.constructor.name}'s member method "${n as string}" parameters[${i}]`);
    },
    staticMethodParameter(c, n, i): void {

        console.log(`Decorated class ${c.name}'s static method "${n as string}" parameters[${i}]`);
    }
});

@test
class DemoGeneralDecorator {

    @test
    private _value: number;

    @test
    public static _staticValue: number;

    public constructor(@test v: number) {

        this._value = v;
    }

    @test
    public print(@test i: number): void {

        console.log(`Test: ${this._value + i}`);
    }

    @test
    public static greet(@test person: string): void {

        console.log('Hello', person);
    }
}

new DemoGeneralDecorator(233).print(333);


const mark = $Decorators.createPropertyDecorator(function() {});
const gMark = $Decorators.createGeneralDecorator({ property() {}, staticProperty() {} });

class A {

    @mark
    public a!: string;

    public b!: string;

    @mark
    public c!: string;

    @gMark
    public static d: string;
}

console.log($Decorators.getOwnPropertyNames(A).join(','));
