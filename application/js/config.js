'use strict';
var appConfigModule = angular.module('applicationConfigModule', []);

appConfigModule.constant('appConfig', {
    createXSDServiceUrl:"http://127.0.0.1:9999/xsl",
    pdfTemp:"temp/sample.pdf",
    dsTemp:"temp/datasource.xml",
    xslTemp:"temp/fop.xsl"
});