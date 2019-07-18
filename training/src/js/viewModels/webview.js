/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'jquery', 'text!../data/laptop.json',  'ojs/ojarraydataprovider', 'ojs/ojknockout-keyset','ojs/ojknockout',
'ojs/ojtable', 'ojs/ojcheckboxset', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojbutton'],
  function (ko, $,laptopData, ArrayDataProvider, keySet) {

    function WebViewViewModel() {
      var self = this;

      self.selectedIdx = ko.observable();
      self.resultmsg = ko.observable();
      self.laptopJsonData = JSON.parse(laptopData);


      self.columnArray = [{"headerText": "",
                            "template": "checkTemplate",
                            "sortable": "disabled" },
                          {"headerText": "",
                            "field": "image",
                            "template" : "imageTemplate"},                       
                          {"headerText": "제조사",
                            "field": "maker"},
                          {"headerText": "모델",
                            "field": "model",
                            "template" : "modelTemplate"},
                          {"headerText": "사양",
                            "field": "spec"},
                          {"headerText": "무게",
                            "field": "weight"},
                          {"headerText": "가격",
                          "field": "price"}]; 

      self.selectedItems = new keySet.ObservableKeySet();
      self.handleCheckbox = function(id)
      {
          var isChecked = this.selectedItems().has(id);
          return isChecked ? ["checked"] : [];
      }.bind(self);

      self.checkboxListener = function(event)
      {
        if (event.detail != null)
        {
            var value = event.detail.value;

            // need to convert to Number to match the DepartmentId key type
            var key = Number(event.target.dataset.rowKey);
            if (value.length > 0 && !this.selectedItems().has(key))
            {
                this.selectedItems.add([key]);
            }
            else if (value.length === 0 && this.selectedItems().has(key))
            {
                this.selectedItems.delete([key]);
            }
        }
      }.bind(self);

      self.selectionListener = function(event)
      {
        var selectionTxt = "";
  
        var selected = this.selectedItems();
        if (selected.isAddAll()) 
        {
            var iterator = selected.deletedValues();
            iterator.forEach(function(key)
            {
                selectionTxt = selectionTxt.length === 0 ? key : selectionTxt + ", " + key;
            });

            if (iterator.size > 0)
            {
                selectionTxt = " except " + selectionTxt;
            }
            selectionTxt = "Everything selected" + selectionTxt;      
            
        } 
        else 
        {
            selected.values().forEach(function(key)
            {
                selectionTxt = selectionTxt.length === 0 ? key : selectionTxt + ", " + key;
            });
        }
        self.selectedIdx(selectionTxt);

      }.bind(this);

      self.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }


      self.param1 = ko.observable(self.getParameterByName("param1"));
      self.callbackUrl =  ko.observable(self.getParameterByName("callbackUrl"));

      console.log("param1 ",self.param1());
      console.log("callbackUrl", self.callbackUrl());
      
      self.dataprovider = new ArrayDataProvider(self.laptopJsonData, {keyAttributes: 'id'});
   //   self.searchedresult = ko.observableArray();
      self.searchedresult = [];

      var searchcondition = false;
      
      if (self.param1()) {
            console.log('if param1');
            self.param1(self.param1().trim().toUpperCase());
      
          if (self.param1() !== "" ) {
            console.log('if param1 not empty');
            
            for (var i=0; i < self.laptopJsonData.length; i++) {
              if (self.laptopJsonData[i].maker.includes(self.param1())) {  
                self.searchedresult.push(self.laptopJsonData[i]);
              }
            }
            searchcondition = true;            
          } 
        } 

      if (searchcondition) {
        self.dataprovider = new ArrayDataProvider(self.searchedresult, {keyAttributes: 'id'});
      } else {
        self.dataprovider = new ArrayDataProvider(self.laptopJsonData, {keyAttributes: 'id'});
      }

      self.complete = function () {

        console.log(self.selectedIdx());
        if (self.selectedIdx() === undefined || self.selectedIdx() == "") {
          alert ('선택된 항목이 없습니다.');
        } else {
          var inputItem=  {} ;
          inputItem = self.laptopJsonData.filter(d => d.id  == self.selectedIdx())[0];
          console.log(inputItem);
          //console.log(JSON.stringify(selectedItem));
          $.post(self.callbackUrl(), JSON.stringify(inputItem) , function(data){
          });
          self.resultmsg( '창을 닫고 챗봇으로 돌아가세요' );
        }
        // Implement if needed
      };

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
    return new WebViewViewModel();
  }
);
