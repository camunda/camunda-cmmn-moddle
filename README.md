# camunda-cmmn-moddle

[![Build Status](https://travis-ci.org/camunda/camunda-cmmn-moddle.svg?branch=master)](https://travis-ci.org/camunda/camunda-cmmn-moddle)

This project defines the [Camunda](https://camunda.org) namespace extensions for CMMN 1.1 as a [moddle](https://github.com/bpmn-io/moddle) descriptor.


## Usage

Use it together with [cmmn-moddle](https://github.com/bpmn-io/cmmn-moddle) to validate Camunda CMMN 1.1 extensions.

```javascript
var CmmnModdle = require('cmmn-moddle');

var camundaModdle = require('camunda-cmmn-moddle/resources/camunda');

var moddle = new CmmnModdle({ camunda: camundaModdle });

var humanTask = moddle.create('cmmn:HumanTask', {
  'assignee': 'foo'
});
```


## Building the Project

To run the test suite that includes XSD schema validation you must have a Java JDK installed and properly exposed through the `JAVA_HOME` variable.

Execute the test via

```
npm test
```

Perform a complete build of the library via

```
npm run all
```


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
