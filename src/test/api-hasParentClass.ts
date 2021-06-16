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
