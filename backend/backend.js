/**
 * BACKEND.js main script
 */
var restify = require('restify');
var fs = require('fs-extra');
var path = require('path');
var js2xmlparser = require("js2xmlparser");
var config = JSON.parse(fs.readFileSync('backend-config.json'));
var server = restify.createServer();

const exec = require('child_process').exec;
server.use(restify.bodyParser());

server.listen(9999, function () {
    console.log('%s listening at %s', server.name, server.url);
});

/*
 * fop command to generate pdf
 */
function fop(input, xsl, output, callback){
    console.log('Launching fop method ...');
    var cmd = config.fopCmdPath + ' -xml '+ input + ' -xsl ' + xsl + ' -pdf ' + output;
    console.log(cmd);
    exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('fop has terminated');
            console.log(stdout);
            console.log(stderr);
            console.log('Process terminated ...');
            callback();
        });
};

/*
 * POST create XSL
 */
function createXSL(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('Beginning Create XSL Service ...');
    fs.writeFile(config.tempXSLPath, req.params.message, (err) => {
    console.log(req.params.message);
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('fop.xsl is written ...');
        fop(config.tempDataSourcePath, config.tempXSLPath, config.tempPDFPath, ()=>{res.send(201);return next();});
    });
};

/*
 * POST load XSL
 */
function loadXSL(req, res, next){
    var docModel = req.params.docModel;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('Beginning Load XSL Service ...');
    console.log(docModel);
    console.log('Source file to load is : ' + path.join(config.docModelStorage, docModel, 'fop.xsl'))
    try{
        var sourceFile = path.join(config.docModelStorage, docModel, 'fop.xsl');
        var destFile = config.tempXSLPath;
        fs.copySync(sourceFile, destFile);
        fop(config.tempDataSourcePath, config.tempXSLPath, config.tempPDFPath, ()=>{res.send(201);return next();});
    } catch(err){
        console.error('Fail to copy xsl file from model #' + docModel);
        res.send(503);
        return next();
    }
}

/*
* POST generatePdfEdition
*/
function generatePdfEdition(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var inputTab = req.params.selection;
    console.log('Received = ' + inputTab);
    var outputObject = {
        "afpa" : {
            "denomination" : {
                "ligne1" : "AFPA RHONE-ALPES",
                "ligne2" : "CENTRE DE BOURG EN BRESSE"
            },
            "responsable" : "MME Catherine JOSEPH",
            "adresse" : {
                "ligne1" : "AFPA AIN/RHONE-NORD",
                "ligne2" : "Campus de Bourg-en-Bresse",
                "ligne3" : "17 Route de Seillon",
                "code-postal" : "01003",
                "ville" : "BOURG EN BRESSE CEDEX"
            },
            "telephone" : "1234567890",
            "fax":"0123456789",
            "site-url":"www.afpa.fr"
        },
        "personne" : []
    };

    for(i=0;i<inputTab.length;i++){
        console.log(outputObject);
        outputObject.personne[i] = {
            "civilite" : inputTab[i].civilite,
            "nom" : inputTab[i].nom,
            "prenom" : inputTab[i].prenom,
            "date-de-naissance" : inputTab[i].dateNaissance,
            "adresse" : {
                "ligne1":inputTab[i].adresseLigne1,
                "ligne2":inputTab[i].adresseLigne2,
                "code-postal":inputTab[i].codePostal,
                "ville":inputTab[i].ville
            },
            "formation" : inputTab[i].intituleFormation,
            "date-entree" : inputTab[i].dateDebut,
            "date-fin" : inputTab[i].dateFin
        };
    };
    console.log(outputObject);

    fs.writeFile(config.tempSelectedDataSourcePath, js2xmlparser("document", outputObject), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('datasource-edition.xml is written ...');
        console.log('Copy XSL model ...');
        var sourceFile = path.join(config.docModelStorage, req.params.docModel, 'fop.xsl');
        var destFile = config.tempXSLPath;
        fs.copySync(sourceFile, destFile);
        fop(config.tempSelectedDataSourcePath, config.tempXSLPath, config.tempEditionPdfPath, ()=>{res.send(201);return next();});
    });
};

/*
* POST save XSL model
*/
function saveXSLModel(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('Saving XSL model ...');
    var destinationFile = path.join(config.docModelStorage, req.params.docModel, 'fop.xsl');
    console.log(destinationFile);
    fs.writeFile(destinationFile, req.params.message, (err) => {
         if (err) {
            console.log(err);
            throw err;
         }
         console.log('fop.xsl is written ...');
         res.send(201);
         return next();
    });
};

server.post('/xsl', createXSL);
server.post('/load', loadXSL);
server.post('/generateEdition', generatePdfEdition);
server.post('/saveModel', saveXSLModel);