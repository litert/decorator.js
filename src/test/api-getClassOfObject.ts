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

describe('api:getClassOfObject', function() {

    function generateTest(act: 'return' | 'throw', inName: string, outName: string, inVal: any, outVal: any): void {

        if (act === 'return') {

            it(`${inName} should ${act} ${outName}`, function() {

                $Assert.strictEqual($Decorators.getClassOfObject(inVal), outVal);
            });
        }
        else {

            it(`${inName} should ${act} ${outName}`, function() {

                try {
                    $Decorators.getClassOfObject(inVal);
                    $Assert.fail();
                }
                catch (e) {

                    $Assert.ok(true);
                }
            });
        }
    
    }

    class A {

        public static s1(): void { return; }
    }

    class B extends A {}

    function fn1() {}

    generateTest('return', 'class B object', 'class B', new B(), B);
    generateTest('return', 'class A object', 'class A', new A(), A);
    generateTest('throw', 'function', 'TypeError', fn1, null);
    generateTest('throw', 'class prototype', 'TypeError', A.prototype, null);
    generateTest('throw', 'boolean(true)', 'TypeError', true, null);
    generateTest('throw', 'boolean(false)', 'TypeError', false, null);
    generateTest('throw', 'null', 'TypeError', null, null);
    generateTest('throw', 'undefined', 'TypeError', undefined, null);
    generateTest('throw', 'number 0', 'TypeError', 0, null);
    generateTest('throw', 'number NaN', 'TypeError', NaN, null);
    generateTest('throw', 'bigint 0n', 'TypeError', BigInt(0), null);
    generateTest('throw', 'symbol', 'TypeError', Symbol('0'), null);
    generateTest('throw', 'empty string', 'TypeError', '', null);
    generateTest('throw', 'string "class {}"', 'TypeError', 'class {}', null);
});
