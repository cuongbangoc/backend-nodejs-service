'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var config = require('config');
var yaml = require('js-yaml');

var app = express();

var bodyParser = require('body-parser');
var logger = require('./helpers/logger');

// App Configuration with Swagger
app.set('port', process.env.PORT || config.get("server.port"));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');

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
app.use(require('./middlewares/auth'));

// import routers
app.use(require('./apis'));

// start server
var server = app.listen(config.get('server.port'), config.get('server.host'), function () {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('Server start at http://%s:%s', host, port);
});

module.exports = app;
