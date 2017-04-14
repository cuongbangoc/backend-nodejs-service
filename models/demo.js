'use strict';

module.exports = function (sequelize, DataTypes) {
    var demo = sequelize.define('demo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // Demo.hasMany(models.CigarRating, { as: "cigarRatings" });
            }
        }
    });

    return demo;
};