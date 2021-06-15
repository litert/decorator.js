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
