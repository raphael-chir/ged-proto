'use strict';
/* Directives */
var gedDirectivesModule = angular.module('gedDirectivesModule',[]);

gedDirectivesModule.directive('afpaHeader', function(){
    return {
        restrict:'E',
        templateUrl:'templates/header.html'
    }
});