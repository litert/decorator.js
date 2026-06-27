import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { Classes } from '@litert/decorator/compatible';

NodeTest.describe('[Modern] Compatible Class Decorators', () => {

    NodeTest.it('create should call modern implementation in modern decorators', () => {

        const calls: Record<string, unknown> = {};

        const decorator = Classes.create({
            legacy(ctx) {

                calls['legacy'] = true;
                void ctx;
            },
            modern(ctor, ctx) {

                calls['modern'] = true;
                calls['kind'] = ctx.kind;
                calls['className'] = ctor.name;
                calls['contextName'] = ctx.name;
            },
        });

        @decorator
        class MyClass {}

        void MyClass;

        NodeAssert.strictEqual(calls['legacy'], undefined);
        NodeAssert.strictEqual(calls['modern'], true);
        NodeAssert.strictEqual(calls['kind'], 'class');
        NodeAssert.strictEqual(calls['className'], 'MyClass');
        NodeAssert.strictEqual(calls['contextName'], 'MyClass');
    });
});
