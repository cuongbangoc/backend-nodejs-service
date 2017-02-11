var express = require('express'),
    logger = require('../helpers/logger'),
    router = express.Router(),
    demo_repo = require("../repositories/demo_repository"),
    q = require("q");

/**
 * @swagger
 * path: /api/v1/demo_db
 * operations:
 *   -  httpMethod: GET
 *      summary: demo API
 *      notes: Returns status
 *      responseClass:
 *      nickname: demo
 *      consumes:
 *        - text/html
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: access_token
 *          description: Access Token
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: body
 *          description: experiences infor
 *          paramType: body
 *          required: true
 *          dataType: string
 */

router.get("/demo_db", function(req, res) {
    var data_res = demo_repo.findAll();

    data_res.then(function(rows){
        res.status(200).json({
            error_code: 0,
            message: "Get Demo API SUCCESS",
            data: rows,
            count: rows.rowCount
        });
    }).catch(function(err){
        logger.error(err);
        res.status(500).json({
            error_code: 6,
            message: "Get Demo API ERROR",
            data: null
        });
    });
});

/**
 * @swagger
 * path: /api/v1/hello
 * operations:
 *   -  httpMethod: GET
 *      summary: Hello API
 *      notes: Returns status
 *      responseClass:
 *      nickname: demo
 *      consumes:
 *        - text/html
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: name
 *          description: name
 *          paramType: query
 *          required: true
 *          dataType: string
 */

router.get("/hello", function(req, res) {
    var name = req.query.name;

    res.status(200).json({
        error_code: 0,
        status: "success",
        message: "Hello " + name
    });
});

module.exports =router;