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
