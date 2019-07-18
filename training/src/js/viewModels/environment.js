/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'text!../data/environment.json', '../odaScript/chatWidget.js','ojs/ojknockout',
'ojs/ojlistview', 'ojs/ojslider', 'ojs/ojdialog', 'ojs/ojformlayout', 'ojs/ojinputtext',],
  function (ko, envData, chat ) {

    function EnvironmentViewModel() {
      var self = this;

      self.selectedIdx = ko.observable(1);
      self.envJsonData = JSON.parse(envData);

      self.idDomain = ko.observable(self.envJsonData[self.selectedIdx()].idDomain);
      self.userId = ko.observable(self.envJsonData[self.selectedIdx()].userId);
      self.password = ko.observable(self.envJsonData[self.selectedIdx()].password);
      self.botConUrl = ko.observable(self.envJsonData[self.selectedIdx()].botConUrl);
      self.webChannel = ko.observable(self.envJsonData[self.selectedIdx()].webChannel);
      self.webview = ko.observable(self.envJsonData[self.selectedIdx()].webview);

      self.max = ko.observable(1);
      self.min = ko.observable(0);
      self.step = ko.observable(1);

      self.appId = ko.observable('5caae03bcdf51100116d3144');

      console.log(self.envJsonData);
      
      //loadBot('5caae03bcdf51100116d3144');
      loadBot(self.appId());

      self.valueSelected = (event, data) => {
        console.log(self.selectedIdx());
        self.idDomain(self.envJsonData[self.selectedIdx()].idDomain);
        self.userId (self.envJsonData[self.selectedIdx()].userId);
        self.password(self.envJsonData[self.selectedIdx()].password);
        self.botConUrl(self.envJsonData[self.selectedIdx()].botConUrl);
        self.webChannel(self.envJsonData[self.selectedIdx()].webChannel);
        self.webview(self.envJsonData[self.selectedIdx()].webview);
      }

      self.close = function (event) {
        document.getElementById('appSetDialog').close();
      }

      self.open = function (event) {
        document.getElementById('appSetDialog').open();
      }

      self.setAppId = function () {
        console.log(self.appId());      
        self.close();  
        saveAppId(self.appId());
      }

      self.clear = function () {
        console.log(self.appId());      
        clearChat(self.appId());
      }

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
    return new EnvironmentViewModel();
  }
);
