'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var expect = chai.expect();

chai.use(chaiHttp);

describe('Demo API', function(){
    describe('/GET demo all data in Database', function(){
        it('it should GET all data from DB', function(done){
            chai.request(server)
                .get('/api/v1/demo/demo_db')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.error_code.should.be.eql(0);
                    res.body.data.should.be.a('array');
                  done();
                });
        });
    });

    describe('/GET hello message', function(){
        it('it should say hello', function(done){
            chai.request(server)
                .get('/api/v1/demo/hello?name=ngoccuong')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.error_code.should.be.eql(0);
                    res.body.message.should.be.eql('Hello ngoccuong');
                  done();
                });
        });
    });
});