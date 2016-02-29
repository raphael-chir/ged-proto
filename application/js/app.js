'use strict';
var mainModule = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.codemirror', 'gedServicesModule', 'gedDirectivesModule', 'applicationConfigModule', 'ui.grid', 'ui.grid.selection', 'ui.grid.pinning']);

mainModule.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }
]);

mainModule.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/workspace',{
            templateUrl:'html/workspace.html'
        }).
        when('/edition',{
            templateUrl:'html/edition.html'
        }).
        otherwise({
            redirectTo: '/edition'
        });
}]);

mainModule.controller('editionController',  ['$scope', '$http', '$log', '$timeout', 'uiGridConstants',
    function ($scope, $http, $log, $timeout, uiGridConstants) {
             $scope.gridOptions = {
               enableRowSelection: true,
               enableSelectAll: true,
               selectionRowHeaderWidth: 35,
               rowHeight: 35,
               showGridFooter:true
             };

             $scope.gridOptions.columnDefs = [
               { name: 'grn', displayName:'GRN', width:70},
               { name: 'offre', displayName:'Offre', width:70},
               { name: 'numero-stagiaire', displayName:'Client Stagiaire', width:150, pinnedLeft:true},
               { name: 'numero-resa', displayName:'N° RESA', width:100},
               { name: 'nom', displayName:'Nom', width:100, pinnedLeft:true },
               { name: 'prenom', displayName:'Prénom', width:100, pinnedLeft:true},
               { name: 'mesure', displayName:'Mesure', width:100},
               { name: 'convention', displayName:'Convention', width:120},
               { name: 'remu', displayName:'Rému', width:100},
               { name: 'date-debut', displayName:'Date début', width:100},
               { name: 'date-fin', displayName:'Date fin', width:100},
               { name: 'statut', displayName:'Statut', width:100},
               { name: 'courrier', displayName:'Courrier', width:100},
               { name: 'alea', displayName:'Aléa', width:100},
               { name: 'edit', displayName:'Edité', width:100}
             ];

             $scope.gridOptions.multiSelect = true;

             $http.get('mocks/students.json')
               .success(function(data) {
                 $scope.gridOptions.data = data;
               });

               $scope.info = {};
           }]);