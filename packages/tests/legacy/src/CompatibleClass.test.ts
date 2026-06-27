import * as NodeTest from 'node:test';
import * as NodeAssert from 'node:assert';
import { Classes } from '@litert/decorator/compatible';

NodeTest.describe('[Legacy] Compatible Class Decorators', () => {

    NodeTest.it('create should call legacy implementation in legacy decorators', () => {

        const calls: Record<string, unknown> = {};

        const decorator = Classes.create({
            legacy(ctx) {

                calls['legacy'] = true;
                calls['type'] = ctx.type;
                calls['className'] = ctx.constructor.name;
            },
            modern(ctor, ctx) {

                calls['modern'] = true;
                void ctor;
                void ctx;
            },
        });

        @decorator
        class MyClass {}

        void MyClass;

        NodeAssert.strictEqual(calls['legacy'], true);
        NodeAssert.strictEqual(calls['modern'], undefined);
        NodeAssert.strictEqual(calls['type'], 'class');
        NodeAssert.strictEqual(calls['className'], 'MyClass');
    });
});
