var restify = require('restify');
var fs = require('fs-extra');
var path = require('path');
const exec = require('child_process').exec;

var config = JSON.parse(fs.readFileSync('backend-config.json'));

var server = restify.createServer();

server.use(restify.bodyParser());

server.listen(9999, function () {
    console.log('%s listening at %s', server.name, server.url);
});

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
        console.log('Launching fop ...');
        var cmd = config.fopCmdPath + ' -xml '+ config.tempDataSourcePath + ' -xsl ' + config.tempXSLPath + ' -pdf ' + config.tempPDFPath;
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
                res.send(201);
                return next();
            });
    });
};

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
        console.log('Launching fop ...');
        var cmd = config.fopCmdPath + ' -xml '+ config.tempDataSourcePath + ' -xsl ' + config.tempXSLPath + ' -pdf ' + config.tempPDFPath;
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
                res.send(201);
                return next();
            });
    } catch(err){
        console.error('Fail to copy xsl file from model #' + docModel);
        res.send(503);
        return next();
    }
}

server.post('/xsl', createXSL);
server.post('/load', loadXSL);