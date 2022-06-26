
# About 
This module is based on this [Stack Overflow Answer](https://stackoverflow.com/a/52956411).

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