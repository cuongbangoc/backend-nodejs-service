'use strict';

var Sequelize = require('sequelize');
var config = require('config');

var sequelize = new Sequelize(config.get("db.database"), config.get("db.user"), config.get("db.password"), config.get("db.options"));

module.exports = sequelize;
