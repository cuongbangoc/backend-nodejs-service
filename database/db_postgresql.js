var pg = require('pg');
var config = require('config');

var pool = null;

function connect(){

}

function getPool(){
    if(!pool){
        var options = {
            host: config.get("postgresql.host"),
            user: config.get("postgresql.user"), //env var: PGUSER
            database: config.get("postgresql.database"), //env var: PGDATABASE
            password: config.get("postgresql.password"), //env var: PGPASSWORD
            port: config.get("postgresql.port"), //env var: PGPORT
            max: config.get("postgresql.pool_max"), // max number of clients in the pool
            idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
        }

        pool = new pg.Pool(options);
    }

    return pool;
}

module.exports = {
    connect: connect,
    getPool: getPool
};
