'use strict';
/* Services */
var gedServicesModule = angular.module('gedServicesModule', ['ngResource']);

gedServicesModule.factory('gedServices', gedServices);
gedServices.$inject = ['$resource', '$log'];

function gedServices($resource, $log){
    return{
        getDataSource :function(success, error){
            var res = $resource('../temp/datasource.xml',{}, {
                    exec:{
                        method : 'GET'
                    }});
            return res.exec(success, error);
        },
        getXSLT :function(success, error){
            var res = $resource('../temp/fop.xsl',{}, {
                    exec:{
                        method : 'GET'
                    }});
            return res.exec(success, error);
        }
    }
}