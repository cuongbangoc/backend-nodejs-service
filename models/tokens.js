'use strict';

module.exports = function (sequelize, DataTypes) {
    var tokens = sequelize.define('tokens', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expired_at: {
            type: DataTypes.DATE
        },
        created_at: DataTypes.DATE
    }, {
        classMethods: {
            associate: function (models) {
                // Demo.hasMany(models.CigarRating, { as: "cigarRatings" });
            }
        }
    });

    return tokens;
};