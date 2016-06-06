'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('camunda:priority', function() {

      it('on HumanTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/humanTask-camunda-priority.part.cmmn');

        // when
        moddle.fromXML(xml, 'cmmn:HumanTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'cmmn:HumanTask',
            priority: '${ priority }'
          });

          done(err);
        });

      });
    });


    it('camunda:script', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-script.part.cmmn');

      // when
      moddle.fromXML(xml, 'camunda:Script', function(err, script) {

        // then
        expect(script).to.jsonEqual({
          $type: 'camunda:Script',
          scriptFormat: 'groovy',
          resource: 'null',
          value: 'foo = bar;'
        });

        done(err);
      });
    });


    it('camunda:in', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-in.part.cmmn');

      // when
      moddle.fromXML(xml, 'camunda:In', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'camunda:In',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    it('camunda:out', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-out.part.cmmn');

      // when
      moddle.fromXML(xml, 'camunda:Out', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'camunda:Out',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    describe('camunda:FormSupported with camunda:formKey', function() {

      it('on HumanTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/humanTask-camunda-formSupported.part.cmmn');

        // when
        moddle.fromXML(xml, 'cmmn:HumanTask', function(err, task) {

          // then
          expect(task).to.jsonEqual({
            $type: 'cmmn:HumanTask',
            formKey: 'form.html'
          });

          done(err);
        });
      });

    });


    it('cmmn:CaseTask', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/caseTask.part.cmmn');

      // when
      moddle.fromXML(xml, 'cmmn:CaseTask', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'cmmn:CaseTask',
          caseBinding: 'foo',
          caseVersion: '1',
          caseTenantId: 'bar'
        });

        done(err);
      });

    });


    it('cmmn:DecisionTask', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/decisionTask.part.cmmn');

      // when
      moddle.fromXML(xml, 'cmmn:DecisionTask', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'cmmn:DecisionTask',
          decisionBinding: 'foo',
          decisionVersion: '1',
          decisionTenantId: 'bar',
          mapDecisionResult: 'resultList',
          resultVariable: 'aVariable'
        });

        done(err);
      });

    });


    it('cmmn:ProcessTask', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/processTask.part.cmmn');

      // when
      moddle.fromXML(xml, 'cmmn:ProcessTask', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'cmmn:ProcessTask',
          processBinding: 'foo',
          processVersion: '1',
          processTenantId: 'bar'
        });

        done(err);
      });

    });


    describe('camunda:caseExecutionListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-caseExecutionListener.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:CaseExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:CaseExecutionListener',
            event: 'complete',
            'class': 'my.company.Listener',
            delegateExpression: '${myExecutionListener}',
            expression: '${myExecutionListener.notify(execution)}'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-caseExecutionListener-script.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:CaseExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:CaseExecutionListener',
            event: 'complete',
            script: {
              $type: 'camunda:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });

    });


    describe('camunda:taskListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-taskListener.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:TaskListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:TaskListener',
            event: 'create',
            'class': 'my.company.Listener',
            delegateExpression: '${myTaskListener}',
            expression: '${myTaskListener.notify(task, task.eventName)}'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-taskListener-script.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:TaskListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:TaskListener',
            event: 'create',
            script: {
              $type: 'camunda:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });

    });


    describe('camunda:variableListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-variableListener.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:VariableListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:VariableListener',
            event: 'update',
            'class': 'my.company.Listener',
            delegateExpression: '${myListener}',
            expression: '${myListener.notify(execution)}'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-variableListener-script.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:VariableListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:VariableListener',
            event: 'update',
            script: {
              $type: 'camunda:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });

    });

    describe('camunda:field', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-field-attributes.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:Field', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'camunda:Field',
            name: 'html',
            expression: '<html><body>Hi!</body></html>',
            stringValue: '41 is not the answer!'
          });

          done(err);
        });
      });


      it('with nested expression and string', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-field-children.part.cmmn');

        // when
        moddle.fromXML(xml, 'camunda:Field', function(err, field) {

          // then
          expect(field).to.jsonEqual({
            $type: 'camunda:Field',
            name: 'html',
            expression: '<html><body>Hi!</body></html>',
            string: '42 is the answer!'
          });

          done(err);
        });
      });

    });


    it('camunda:repeatOnStandardEvent', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/repetitionRule-repeatOnStandardEvent.part.cmmn');

      // when
      moddle.fromXML(xml, 'cmmn:RepetitionRule', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'cmmn:RepetitionRule',
          repeatOnStandardEvent: 'exit'
        });

        done(err);
      });

    });

  });

});
