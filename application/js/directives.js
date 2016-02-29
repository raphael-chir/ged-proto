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
        controller: function($scope, $log, gedServices, $http, $timeout, appConfig){
             $scope.pdfTmpUrl = appConfig.pdfTemp;
             $scope.tabs=1;
             $scope.pdfRefreshed=true;
             $scope.codemirrorLoaded = function(_editor){
                var _doc = _editor.getDoc();
                _editor.focus();

                gedServices.getXSLT(function(success){
                                             var result = '';
                                             for(var i in success){
                                                 if(typeof success[i][0] !== 'undefined')
                                                     result += success[i][0];
                                             }
                                             _editor.setOption('value', result);
                                             _editor.refresh();
                                             $log.debug(result);
                                         },
                                         function(error){
                                             $log.debug('KO');
                                         }
                );
                // Options
                _editor.setOption('lineNumbers', true);
                _editor.setOption('mode', 'xml');
                _editor.setSize('100%', 700);
                _doc.markClean();
                // Events
                //_editor.on("beforeChange", function(){ ... });
                //_editor.on("change", function(){ ... });
                $scope.generate = function(){
                    $scope.pdfRefreshed=false;
                    $log.debug('Working ...');
                    $log.debug(_editor.getValue());
                    $log.debug('XSD Service = ' + appConfig.createXSDServiceUrl);
                    $http.post(appConfig.createXSDServiceUrl,{'message' : _editor.getValue()}).then(
                                            function(success){
                                                $log.debug('Control done ...');
                                                $scope.pdfTmpUrl += "?d="+(new Date()).getTime();
                                                //$timeout( function(){ $scope.pdfRefreshed=true; }, 500);
                                                $scope.pdfRefreshed=true;
                                            },
                                            function(error){});

                };
              };

            $scope.codemirrorXMLLoaded = function(_editor){
                  var _doc = _editor.getDoc();
                  _editor.focus();

                  gedServices.getDataSource(
                      function(success){
                          var result = '';
                          for(var i in success){
                              if(typeof success[i][0] !== 'undefined')
                                  result += success[i][0];
                          }
                          _editor.setOption('value', result);
                          _editor.refresh();
                          //$log.debug(result);
                      },
                      function(error){
                          $log.debug('KO');
                      }
                  );
                  // Options
                  _editor.setOption('lineNumbers', true);
                  _editor.setOption('mode', 'xml');
                  _editor.setSize('100%', 300);
                  _doc.markClean();

                  // Events
                  //_editor.on("beforeChange", function(){ ... });
                  //_editor.on("change", function(){ ... });
                };
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