'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Auth API', function(){
    describe('/POST login', function(){
        it('it should login success', function(done){
            chai.request(server)
                .post('/api/v1/auth/login')
                // .field('email', 'test@test.com')
                // .field('password', '123456')
                .send({email: "test@test.com", password: "123456"})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.error_code.should.be.eql(0);
                    res.body.access_token.should.be.a('string');
                    res.body.user.should.be.a('object');
                  done();
                });
        });
    });

    // describe('/GET hello message', function(){
    //     it('it should say hello', function(done){
    //         chai.request(server)
    //             .get('/api/v1/demo/hello?name=ngoccuong')
    //             .end(function(err, res){
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.error_code.should.be.eql(0);
    //                 res.body.message.should.be.eql('Hello ngoccuong');
    //               done();
    //             });
    //     });
    // });
});