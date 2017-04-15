module.exports = function(sequelize, DataTypes) {
    return sequelize.define('UserAccount', {
        id: {
            type: DataTypes.STRING(14),
            unique: true,
            primaryKey: true,
            alowNull: false
        },
        userName: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        password: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        userType: {
            type: DataTypes.STRING(15),
            alowNull: false
        }
    })
}