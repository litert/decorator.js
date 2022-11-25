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

import * as $Assert from 'assert';
import $Decorators from '../lib';
describe('api:isClassConstructor', function() {

    class A {

        public static s1(): void { return; }
    }

    function fn1() {}

    it('class should pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(A), true);
    });

    it('function should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(fn1), false);
    });

    it('class prototype should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(A.prototype), false);
    });

    it('boolean(true) should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(true), false);
    });

    it('boolean(false) should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(false), false);
    });

    it('null should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(null), false);
    });

    it('undefined should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(undefined), false);
    });

    it('number 0 should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(0), false);
    });

    it('number NaN should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(NaN), false);
    });

    it('bigint 0n should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(BigInt(0)), false);
    });

    it('symbol should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(Symbol('0')), false);
    });

    it('empty string should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor(''), false);
    });

    it('string "class {}" should not pass', function() {

        $Assert.strictEqual($Decorators.isClassConstructor('class {}'), false);
    });
});
