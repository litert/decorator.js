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

import * as $Assert from 'assert';
import $Decorators from '../lib';
describe('api:getParentClass', function() {

    class A {

        public static s1(): void { return; }
    }

    class B extends A {}

    function fn1() {}

    function generateTest(inputName: string, outputName: string, input: any, expected: any): void {

        it(`${inputName} should return ${outputName}`, function() {

            $Assert.strictEqual($Decorators.getParentClass(input), expected);
        });
    }

    generateTest('class B', 'A', B, A);
    generateTest('class A', 'null', A, null);
    generateTest('function', 'null', fn1, null);
    generateTest('class prototype', 'null', A.prototype, null);
    generateTest('boolean(true)', 'null', true, null);
    generateTest('boolean(false)', 'null', false, null);
    generateTest('null', 'null', null, null);
    generateTest('undefined', 'null', undefined, null);
    generateTest('number 0', 'null', 0, null);
    generateTest('number NaN', 'null', NaN, null);
    generateTest('bigint 0n', 'null', BigInt(0), null);
    generateTest('symbol', 'null', Symbol('0'), null);
    generateTest('empty string', 'null', '', null);
    generateTest('string "class {}"', 'null', 'class {}', null);
});
