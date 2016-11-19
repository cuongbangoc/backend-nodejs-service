var q = require("q");
var db = require("../database/db_postgresql");

var pool = db.getPool();

function get_demo(){
    var defer = q.defer();

    pool.connect(function(err, client, done) {
        if(err) {
            defer.reject(err);
        }
        client.query('SELECT * FROM demo', [], function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if(err) {
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
    });

    return defer.promise;
}

module.exports = {
    get_demo: get_demo
}