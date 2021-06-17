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
describe('api:isClassPrototype', function() {

    class A {

        public static s1(): void { return; }
    }

    function fn1() {}

    it('class prototype should pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(A.prototype), true);
    });

    it('class should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(A), false);
    });

    it('function should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(fn1), false);
    });

    it('boolean(true) should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(true), false);
    });

    it('boolean(false) should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(false), false);
    });

    it('null should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(null), false);
    });

    it('undefined should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(undefined), false);
    });

    it('number 0 should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(0), false);
    });

    it('number NaN should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(NaN), false);
    });

    it('bigint 0n should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(BigInt(0)), false);
    });

    it('symbol should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(Symbol('0')), false);
    });

    it('empty string should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype(''), false);
    });

    it('string "class {}" should not pass', function() {

        $Assert.strictEqual($Decorators.isClassPrototype('class {}'), false);
    });
});
