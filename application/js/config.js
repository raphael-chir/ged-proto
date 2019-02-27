'use strict';
var appConfigModule = angular.module('applicationConfigModule', []);

appConfigModule.constant('appConfig', {
    createXSDServiceUrl:"http://127.0.0.1:9999/xsl",
    loadXSDServiceUrl:"http://127.0.0.1:9999/load",
    generateEditionServiceUrl:"http://127.0.0.1:9999/generateEdition",
    saveModelServiceUrl:"http://127.0.0.1:9999/saveModel",
    pdfTemp:"temp/sample.pdf",
    pdfGeneratedEdition:"temp/edition.pdf",
    dsTemp:"temp/datasource.xml",
    xslTemp:"temp/fop.xsl"
});