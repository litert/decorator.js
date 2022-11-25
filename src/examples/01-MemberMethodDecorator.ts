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

import $Decorators from '../lib';

class DemoMemberMethodDecorator {

    @$Decorators.createMethodDecorator(function(proto, name, dtr) {
        console.log('test1: After decorated:')
        console.log(`test1:   configurable: ${dtr.configurable}`);
        console.log(`test1:   value: ${dtr.value}`);
    })
    @$Decorators.createMethodDecorator(function(proto, name, dtr) {
        console.log('test1: Before decorated:')
        console.log(`test1:   configurable: ${dtr.configurable}`);
        console.log(`test1:   value: ${dtr.value}`);

        dtr.value = function hello() { console.log('this is test 1 hello'); };
        dtr.configurable = false;
    })
    @$Decorators.createMethodDecorator(function(proto, name, dtr) {
        console.log(`test1: Decorated method ${proto.constructor.name}::${name as string}`);
    })
    public test1(): void {

        console.log('this is test 1');
    }

    @$Decorators.composite([

        $Decorators.createMethodDecorator(function(proto, name, dtr) {
            console.log(`test2: Decorated method ${proto.constructor.name}::${name as string}`);
        }),
        $Decorators.createMethodDecorator(function(proto, name, dtr) {
            console.log('test2: Before decorated:')
            console.log(`test2:   configurable: ${dtr.configurable}`);
            console.log(`test2:   value: ${dtr.value}`);
    
            dtr.value = function go() { console.log('this is test 2 go'); };
            dtr.configurable = false;
        }),
        $Decorators.createMethodDecorator(function(proto, name, dtr) {
            console.log('test2: After decorated:')
            console.log(`test2:   configurable: ${dtr.configurable}`);
            console.log(`test2:   value: ${dtr.value}`);
        })
    ])
    public test2(): void {
        console.log('this is test 2');
    }
}

console.log('test1: Final:')
console.log(`test1:   configurable: ${Object.getOwnPropertyDescriptor(DemoMemberMethodDecorator.prototype, 'test1')!.configurable}`);
console.log(`test1:   value: ${DemoMemberMethodDecorator.prototype.test1}`);

console.log('test2: Final:')
console.log(`test2:   configurable: ${Object.getOwnPropertyDescriptor(DemoMemberMethodDecorator.prototype, 'test2')!.configurable}`);
console.log(`test2:   value: ${DemoMemberMethodDecorator.prototype.test2}`);

new DemoMemberMethodDecorator().test1();
new DemoMemberMethodDecorator().test2();
