'use strict';
var mainModule = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.codemirror', 'gedServicesModule', 'gedDirectivesModule', 'applicationConfigModule', 'ui.grid', 'ui.grid.selection', 'ui.grid.pinning']);

mainModule.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    }
]);

mainModule.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/workspace/:mod?',{
            templateUrl:'html/workspace.html'
        }).
        when('/edition',{
            templateUrl:'html/edition.html'
        }).
        otherwise({
            redirectTo: '/edition'
        });
}]);

mainModule.controller('editionController',  ['$scope', '$http', '$log', '$timeout', 'uiGridConstants', 'appConfig', '$window',
    function ($scope, $http, $log, $timeout, uiGridConstants, appConfig, $window) {
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
               { name: 'civilite', displayName:'Civilité', width:100, pinnedLeft:true },
               { name: 'nom', displayName:'Nom', width:100, pinnedLeft:true },
               { name: 'prenom', displayName:'Prénom', width:100, pinnedLeft:true},
               { name: 'mesure', displayName:'Mesure', width:100},
               { name: 'convention', displayName:'Convention', width:120},
               { name: 'remu', displayName:'Rému', width:100},
               { name: 'dateDebut', displayName:'Date début', width:100},
               { name: 'dateFin', displayName:'Date fin', width:100},
               { name: 'intituleFormation', displayName:'Formation', width:150},
               { name: 'statut', displayName:'Statut', width:100},
               { name: 'courrier', displayName:'Courrier', width:100},
               { name: 'alea', displayName:'Aléa', width:100},
               { name: 'edit', displayName:'Edité', width:100}
             ];

             $scope.gridOptions.multiSelect = true;

            $scope.gridOptions.onRegisterApi = function(gridApi){
              //set gridApi on scope
              $scope.gridApi = gridApi;
              gridApi.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected ' + row.isSelected;
                $log.log(msg);
              });

              gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
                var msg = 'rows changed ' + rows.length;
                $log.log(msg);
              });
            };

             $http.get('mocks/students.json')
               .success(function(data) {
                 $scope.gridOptions.data = data;
               });

             $scope.info = {};

             $scope.docModel="02ATT54";

             $scope.generatePDF = function(){
                $log.debug('Generate PDF');
                $log.debug($scope.gridApi.selection.getSelectedRows());
                if($scope.gridApi.selection.getSelectedRows() && $scope.gridApi.selection.getSelectedRows().length != 0 ){
                $http.post(appConfig.generateEditionServiceUrl,{'selection' : $scope.gridApi.selection.getSelectedRows(), 'docModel' :$scope.docModel}).then(
                function(success){
                    $log.debug('success');
                    $window.open('http://localhost:9000/temp/edition.pdf', 'Editions' , 'width=600,height=850');
                }
                ,function(error){});
                    $log.debug('success');
                }
             }
           }]);