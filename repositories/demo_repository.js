var models = require("../models");

var DemoRepository = {
    findAll: function(){
        return models.demo.findAll();
    }
}

module.exports = DemoRepository;