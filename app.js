'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var config = require('config');
var yaml = require('js-yaml');
var helmet = require('helmet');
var app = express();

var bodyParser = require('body-parser');
var logger = require('./helpers/logger');

// App Configuration with Swagger
app.set('port', process.env.PORT || config.get("server.port"));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
//
// Use helmet to secure Express headers
// Don't allow me to be in ANY frames:
// app.use(helmet.frameguard({
//     action: 'deny'
// }));

// Only let me be framed by people of the same origin:
app.use(helmet.frameguard({
    action: 'sameorigin'
}));
app.use(helmet.frameguard()); // defaults to sameorigin

// Allow from a specific host:
// app.use(helmet.frameguard({
//     action: 'allow-from',
//     domain: 'http://example.com'
// }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
// Hide X-Powered-By
app.use(helmet.hidePoweredBy());

app.disable('x-powered-by');
app.enable("trust proxy");
app.set("trust proxy", true);

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// add-on swagger-editor
app.use('/swagger', express.static('./node_modules/swagger-editor'));
app.use('/', express.static('./docs'));
app.get('/docs', function(req, res){
    var docs = yaml.safeLoad(fs.readFileSync('./docs/swagger.yml', 'utf8'));
    res.send(JSON.stringify(docs));
});

// app.use(express.static(path.join(__dirname, 'public')));

// body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import middlewares
// app.use(require('./middlewares/auth'));
// app.all('/api/v1/users*', [require('./middlewares/auth')]);

// import routers
app.use(require('./apis'));

// start server
var server = app.listen(config.get('server.port'), config.get('server.host'), function () {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('Server start at http://%s:%s', host, port);
});

module.exports = app;
