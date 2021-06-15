import * as $Assert from 'assert';
import $Decorators from '../lib';
describe('api:hasParentClass', function() {

    class A {

        public static s1(): void { return; }
    }

    class B extends A {}

    function fn1() {}

    it('class B should return true', function() {

        $Assert.strictEqual($Decorators.hasParentClass(B), true);
    });

    it('class A should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(A), false);
    });

    it('function should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(fn1 as any), false);
    });

    it('class prototype should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(A.prototype as any), false);
    });

    it('boolean(true) should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(true as any), false);
    });

    it('boolean(false) should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(false as any), false);
    });

    it('null should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(null as any), false);
    });

    it('undefined should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(undefined as any), false);
    });

    it('number 0 should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(0 as any), false);
    });

    it('number NaN should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(NaN as any), false);
    });

    it('bigint 0n should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(BigInt(0) as any), false);
    });

    it('symbol should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass(Symbol('0') as any), false);
    });

    it('empty string should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass('' as any), false);
    });

    it('string "class {}" should return false', function() {

        $Assert.strictEqual($Decorators.hasParentClass('class {}' as any), false);
    });
});
