'use strict';
var gedDirectivesModule = angular.module('gedDirectivesModule',[]);

gedDirectivesModule.directive('afpaHeader', function(){
    return {
        restrict:'E',
        templateUrl:'templates/header.html'
    }
});

gedDirectivesModule.directive('afpaModelEditor', function(){
    return {
        restrict:'E',
        templateUrl:'templates/model-editor.html'
    }
});

gedDirectivesModule.directive('afpaPdfViewer', function(){
    return {
        restrict:'E',
        templateUrl:'templates/pdf-viewer.html'
    }
});

gedDirectivesModule.directive('afpaModelWorkspace', function(){
    return {
        restrict:'E',
        templateUrl:'templates/afpa-model-workspace.html',
        controller: function($scope, $log, gedServices, $http, $timeout, appConfig, $routeParams){
             $scope.docModel = $routeParams.mod;
             $scope.tabs=1;

             $scope.codemirrorXSLLoaded = function(_editor){
                var _doc = _editor.getDoc();
                _editor.focus();
                _editor.setOption('lineNumbers', true);
                _editor.setOption('mode', 'xml');
                _editor.setSize('100%', 700);
                _doc.markClean();

                $scope.generate = function(){
                      $scope.pdfRefreshed=false;
                      $scope.pdfTmpUrl = appConfig.pdfTemp;
                      $log.debug('pdf temp url = ' + $scope.pdfTmpUrl);
                      $log.debug('Working ...');
                      $log.debug('XSD Service = ' + appConfig.createXSDServiceUrl);
                      $http.post(appConfig.createXSDServiceUrl,{'message' : _editor.getValue()}).then(
                                              function(success){
                                                  $log.debug('Control done ...');
                                                  $scope.pdfTmpUrl += "?d="+(new Date()).getTime();
                                                  //$timeout( function(){ $scope.pdfRefreshed=true;}, 500);
                                                  $scope.pdfRefreshed=true;
                                              },
                                              function(error){});
                  };

                  $scope.save = function(){
                      $log.debug('Save ');
                      $log.debug('XSD Service = ' + appConfig.createXSDServiceUrl);
                      $http.post(appConfig.saveModelServiceUrl,{'message' : _editor.getValue(), 'docModel' : $routeParams.mod}).then(
                                              function(success){
                                                $log.debug('Save done ...');
                                              },
                                              function(error){});
                  };
             };
             $scope.codemirrorXMLLoaded = function(_editor){
                var _doc = _editor.getDoc();
                _editor.focus();
                _editor.setOption('lineNumbers', true);
                _editor.setOption('mode', 'xml');
                _editor.setSize('100%', 300);
                _doc.markClean();
             };
             $log.debug('XSD Loader Service = ' + appConfig.loadXSDServiceUrl);
             $http.post(appConfig.loadXSDServiceUrl,{'docModel' : $routeParams.mod}).then(loadWorkspace,function(error){});

             function loadWorkspace(success){
                $log.debug("Loading workspace");
                $scope.pdfTmpUrl = appConfig.pdfTemp;
                $scope.pdfRefreshed=true;
                gedServices.getXSLT(
                                function(success){
                                      var result = '';
                                      for(var i in success){
                                          if(typeof success[i][0] !== 'undefined')
                                              result += success[i][0];
                                      }
                                      $scope.xslContent = result;
                                      $scope.xslLoaded = true;
                                },
                                function(error){
                                      $log.debug('KO');
                                });
                gedServices.getDataSource(
                                function(success){
                                      var result = '';
                                      for(var i in success){
                                          if(typeof success[i][0] !== 'undefined')
                                              result += success[i][0];
                                      }
                                      $scope.xmlContent = result;
                                      $scope.xmlLoaded = true;
                                  },
                                  function(error){
                                      $log.debug('KO');
                                  }
                              );
                };


    $scope.models = {
        selected: null,
        templates: [
            {type: "header", id: 3, symbol:"header"},
            {type: "item", id: 2, symbol:"pencil"},
            {type: "container", id: 1, columns: [[], []], symbol:"inbox"}
        ],
         dropzones: {
                    "B": [
                        {
                            "type": "header",
                            "id": 1
                        },
                        {
                            "type": "item",
                            "id": "8"
                        },
                        {
                            "type": "container",
                            "id": "1",
                            "columns": [
                                [
                                    {
                                        "type": "item",
                                        "id": "9"
                                    },
                                    {
                                        "type": "item",
                                        "id": "10"
                                    },
                                    {
                                        "type": "item",
                                        "id": "11"
                                    }
                                ],
                                [
                                    {
                                        "type": "item",
                                        "id": "12"
                                    },
                                    {
                                        "type": "container",
                                        "id": "3",
                                        "columns": [
                                            [
                                                {
                                                    "type": "item",
                                                    "id": "13"
                                                }
                                            ],
                                            [
                                                {
                                                    "type": "item",
                                                    "id": "14"
                                                }
                                            ]
                                        ]
                                    },
                                    {
                                        "type": "item",
                                        "id": "15"
                                    },
                                    {
                                        "type": "item",
                                        "id": "16"
                                    }
                                ]
                            ]
                        },
                        {
                            "type": "item",
                            "id": 16
                        }
                    ]
                }
        };


    $scope.$watch('models.dropzones', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

            }
        }
});

gedDirectivesModule.directive('draggable', function(){
    return {
        restrict:'A',
        link: function(scope, element, attrs) {
              element.draggable({
                revert:false
              });
            }
    };
});