import * as $Assert from 'assert';
import $Decorators from '../lib';
describe('api:getParentClass', function() {

    class A {

        public static s1(): void { return; }
    }

    class B extends A {}

    function fn1() {}

    it('class B should return A', function() {

        $Assert.strictEqual($Decorators.getParentClass(B), A);
    });

    it('class A should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(A), null);
    });

    it('function should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(fn1 as any), null);
    });

    it('class prototype should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(A.prototype as any), null);
    });

    it('boolean(true) should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(true as any), null);
    });

    it('boolean(false) should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(false as any), null);
    });

    it('null should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(null as any), null);
    });

    it('undefined should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(undefined as any), null);
    });

    it('number 0 should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(0 as any), null);
    });

    it('number NaN should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(NaN as any), null);
    });

    it('bigint 0n should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(BigInt(0) as any), null);
    });

    it('symbol should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass(Symbol('0') as any), null);
    });

    it('empty string should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass('' as any), null);
    });

    it('string "class {}" should return null', function() {

        $Assert.strictEqual($Decorators.getParentClass('class {}' as any), null);
    });
});
