var models = require("../models");

var UserRepository = {
    findAll: function(){
        return models.users.findAll();
    }
}

module.exports = UserRepository;