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
        templateUrl:'templates/afpa-model-workspace.html'
    }
});