'use strict';
var mainModule = angular.module('mainModule', ['ngAnimate', 'ui.bootstrap', 'ui.codemirror', 'gedServicesModule']);

mainModule.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }
]);

mainModule.controller('XSLTController', [ '$scope', '$log', 'gedServices', '$http', '$timeout', function($scope, $log, gedServices, $http, $timeout) {
     $scope.pdfTmpUrl = "../temp/sample.pdf";
     $scope.tabs=1;
     $scope.pdfRefreshed=true;
     $scope.codemirrorLoaded = function(_editor){
        var _doc = _editor.getDoc();
        _editor.focus();

        gedServices.getXSLT(
            function(success){
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
            $http.post('http://127.0.0.1:9999/xsl',{'message' : _editor.getValue()}).then(
                function(success){
                    $log.debug('Control done ...');
                    $scope.pdfTmpUrl = "../temp/sample.pdf?d="+(new Date()).getTime();
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
        };


}]);

