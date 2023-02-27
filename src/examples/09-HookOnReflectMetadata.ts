/**
 * Copyright 2023 Angus.Fenying <fenying@litert.org>
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
import 'reflect-metadata';

$Decorators.hookNativeReflectMetadata();

const mark = $Decorators.createGeneralDecorator({
    property() {},
    method() {},
    class() {}
});

class B {}

@mark
class A {

    @Reflect.metadata('name', '_a')
    private _a!: B;

    @mark
    public a(v: string): string { return '321'; }

    public b(d: B): B { return this._a; }

    @mark
    public c(): number { return 321; }

}

$Decorators.hookNativeReflectMetadata(false);

console.log($Decorators.getOwnMethodNames(A));
console.log($Decorators.getOwnPropertyNames(A));
