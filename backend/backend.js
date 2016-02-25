var restify = require('restify');
var fs = require('fs');
const exec = require('child_process').exec;
const tempDir = 'C:\\Users\\RCH11270\\IdeaProjects\\front-stack-demo\\initial-grunt-project\\temp';
const fopDir = 'C:\\Users\\RCH11270\\IdeaProjects\\front-stack-demo\\initial-grunt-project\\fop-2.1';

var server = restify.createServer();

server.use(restify.bodyParser());

server.listen(9999, function () {
    console.log('%s listening at %s', server.name, server.url);
});

function createXSL(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log('Handling request ...');
    fs.writeFile('../temp/fop.xsl', req.params.message, (err) => {
        if (err) throw err;
        console.log('fop.xsl is written ...');
        console.log('Launching fop ...');
        var cmd = fopDir + '\\fop.bat  -xml '+ tempDir + '\\datasource.xml -xsl ' + tempDir + '\\fop.xsl -pdf ' + tempDir + '\\sample.pdf';
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
}

server.post('/xsl', createXSL);