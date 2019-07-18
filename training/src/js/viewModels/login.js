/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'appController',
'ojs/ojformlayout', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojbutton'],
  function (ko, app) {

    function LoginViewModel() {
      var self = this;


      self.emailmessages = ko.observableArray([]);
      self.passwordmessages = ko.observableArray([]);

      self.email = ko.observable();
      self.password = ko.observable();
    

      self.doLogin = function (event, data) {
        // console.log(self.email());
        // console.log(self.password());
        if (self.password() != 'welcome1'){
          console.log('password invalid');
          self.password("");
          self.email("");

          self.passwordmessages.push({summary: '패스워드를 다시 입력해 주세요', severity: 'error'});
        }
        app.login(true);
        app.userLogin(self.email());
        app.router.go('environment');

      }

      self.emailPatternValidator = ko.pureComputed(function () {
        return [{
          type: 'regExp',
          options: {
            pattern: "[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
            hint: "유효한 이메일을 입력하세요",
            messageDetail: "유효한 이메일 패턴이 아닙니다."
          }
        }];
      });

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      self.connected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new LoginViewModel();
  }
);
