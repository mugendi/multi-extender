// Copyright 2022 Anthony Mugendi
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const extender = require('../');

class Base {
	one() {
        return 'Base Method one'
    }
}

class ExtendOne {
	#__prefix = 'prefix_';

	one() {
		return 'Extend one Method one';
	}
	two() {
		return 'Extend one Method two';
	}
}

class ExtendTwo {
	#__suffix = '_suffix';

	one() {
		return 'Extend two Method one';
	}

	two() {
		return 'Extend two Method two';
	}

	three() {
		return 'Extend two Method three';
	}
}

// console.log(extender)

let Extended = extender(ExtendOne, ExtendTwo)(Base);

// initialize the class
let Initialized = new Extended();

// or
var propertyNames = Object.getOwnPropertyNames(Extended.prototype);
let propReturns = propertyNames
	.filter((n) => n !== 'constructor')
	.map((name) => {
		// call each menthod
		return { prop: name, return: Initialized[name]() };
	});

console.log(propReturns);
