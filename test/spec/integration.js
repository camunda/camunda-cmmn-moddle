'use strict';

var CmmnModdle = require('cmmn-moddle');

var camundaDescriptor = require('../../resources/camunda');


describe('exports', function() {

  it('should extend cmmn-moddle', function() {

    // given
    var moddle = new CmmnModdle({
      camunda: camundaDescriptor
    });

    // when
    var humanTask = moddle.create('cmmn:HumanTask');

    // then
    expect(humanTask.$instanceOf('camunda:Assignable')).to.be.true;
  });

});