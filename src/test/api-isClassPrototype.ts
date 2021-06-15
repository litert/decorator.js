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
