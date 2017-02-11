module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users', {
        u_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        u_email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        u_password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        u_salt: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        u_first_name: DataTypes.STRING(255),
        u_last_name: DataTypes.STRING(255),
        u_type: DataTypes.INTEGER,
        u_is_active: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // Demo.hasMany(models.CigarRating, { as: "cigarRatings" });
            }
        }
    });

    return users;
};