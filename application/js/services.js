'use strict';
/* Services */
var gedServicesModule = angular.module('gedServicesModule', ['ngResource']);

gedServicesModule.factory('gedServices', gedServices);
gedServices.$inject = ['$resource', '$log', 'appConfig'];

function gedServices($resource, $log, appConfig){
    return{
        getDataSource :function(success, error){
            var res = $resource(appConfig.dsTemp,{}, {
                    exec:{
                        method : 'GET'
                    }});
            return res.exec(success, error);
        },
        getXSLT :function(success, error){
            var res = $resource(appConfig.xslTemp,{}, {
                    exec:{
                        method : 'GET'
                    }});
            return res.exec(success, error);
        }
    }
}