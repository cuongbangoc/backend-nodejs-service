'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Users API', function(){
    describe('/GET all users from DB', function(){
        it('it should get users success', function(done){
            chai.request(server)
                .get('/api/v1/users')
                .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X2lkIjoxLCJ1X2VtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVfZmlyc3RfbmFtZSI6IlRlc3QgMSIsInVfbGFzdF9uYW1lIjpudWxsLCJ1X3R5cGUiOm51bGwsInVfaXNfYWN0aXZlIjpudWxsLCJpYXQiOjE0OTI1MTU3NDcsImV4cCI6MTgwMzU1NTc0N30.xJCmmip-srOLlc3PrQgbyKwdMt8SfqKF2pYcsgFZN2U')
                .end(function(err, res){
                    res.should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.error_code).should.be.eql(0);
                    (res.body.data).should.be.a('array');
                    (res.body.message).should.be.a('string');
                    // (res.body.count).should.be.a('number');
                  done();
                });
        });
    });
});