# About

This module is based on this [Stack Overflow Answer](https://stackoverflow.com/a/52956411). It however includes a few changes to help extend classes with the ability to add prefixes or suffixes to the property names.

The purpose is to provide for a straight forward way to extend any class with a multiple other classes.

```javascript

const extender=require("multi-extender);

// This base class can have some methods and properties accessible in all Extension Classes
class BaseClass {}

// the multiple classes we want to extend BaseClass with
class ExtensionOne {}
class ExtensionTwo {}

const MyBaseClass = extender(ExtensionOne, ExtensionTwo)(BaseClass);

```

# Prefixes & Suffixes

Sometimes you want to extend multiple classes, say ( ExtClassA & ExtClassB ), but ExtClassA & ExtClassB have properties with similar names which means the properties of **ExtClassA get overwritten by ExtClassB**, which is definitely not what you wish.

This is where you use **prefixes** and **suffixes**.

To declare a prefix/suffix, we use the [private class features notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) so that the prefix/suffix declaration is localized and private to the class.

-   To prefix we add the property `#__prefix="your_prefix"`.
-   To suffix we add the property `#__suffix="your_prefix"`.

Below is an example:

```javascript
const extender = require('multi-extender');

// This is our base class
class Base {
	one() {
        return 'Base Method one'
    }
}

// Below are the classes we want to extend Base with
// ExtendOne uses a prefix
// ExtendTwo uses a suffix
// Both have methods named "one" and "two"

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

// Tet us apply the extension
let Extended = extender(ExtendOne, ExtendTwo)(Base);

// Now let us test and see how the extensions have been done

// 1. Initialize the class
let Initialized = new Extended();

// 2. Pick all property names
var propertyNames = Object.getOwnPropertyNames(Extended.prototype);
// 3 Loop through each property with exception of 'constructor'
let propReturns = propertyNames
	.filter((n) => n !== 'constructor')
	.map((name) => {
		//4. call each method and get return value
		return { prop: name, return: Initialized[name]() };
	});

// log results
console.log(propReturns);

```

This code will log the following

```javascript
[
  { prop: 'one', return: 'Base Method one' },
  { prop: 'prefix_one', return: 'Extend one Method one' },
  { prop: 'prefix_two', return: 'Extend one Method two' },
  { prop: 'one_suffix', return: 'Extend two Method one' },
  { prop: 'two_suffix', return: 'Extend two Method two' },
  { prop: 'three_suffix', return: 'Extend two Method three' }
]
```

This shows that all six methods exist and have been appropriately renamed. 

You can check out these examples in the **test directory**.

**Important to Note:**

-   When you prefix or suffix classes, the methods will be renamed to `"prefix" + "property"` or `"property" + "suffix"`. Therefore, if the prefix is declared as `#__prefix="cls1_`, then the method `prop_one` becomes `cls1_prop_one` and `prop_one` no longer exists!
-   Therefore, you must select proper prefix/suffix names, cognizant of the fact that you will need to easily access the renamed properties. So name your prefixes and suffixes as you would name variables i.e.
    -   Use snake or camel case
    -   Avoid symbols or exclamations.
