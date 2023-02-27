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

import * as $Assert from 'assert';
import $Decorators from '../lib';
describe('api:hasParentClass', function() {

    class A {

        public static s1(): void { return; }
    }

    class B extends A {}

    function fn1() {}

    function generateTest(inputName: string, outputName: string, input: any, expected: boolean): void {

        it(`${inputName} should return ${outputName}`, function() {

            $Assert.strictEqual($Decorators.hasParentClass(input), expected);
        });
    }

    generateTest('class B', 'true', B, true);
    generateTest('class A', 'false', A, false);
    generateTest('function', 'false', fn1, false);
    generateTest('class prototype', 'false', A.prototype, false);
    generateTest('boolean(true)', 'false', true, false);
    generateTest('boolean(false)', 'false', false, false);
    generateTest('null', 'false', null, false);
    generateTest('undefined', 'false', undefined, false);
    generateTest('number 0', 'false', 0, false);
    generateTest('number NaN', 'false', NaN, false);
    generateTest('bigint 0n', 'false', BigInt(0), false);
    generateTest('symbol', 'false', Symbol('0'), false);
    generateTest('empty string', 'false', '', false);
    generateTest('string "class {}"', 'false', 'class {}', false);
});
