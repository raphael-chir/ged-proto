'use strict';

/* Directives */
var directivesModule = angular.module('directivesModule',[]);

directivesModule.directive('afpaHeader', function(){
    return {
        restrict:'E',
        templateUrl:'templates/header.html'
    }
});
      