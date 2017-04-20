module.exports = function(sequelize, DataTypes) {
    return sequelize.define('UserAccount', {
        userName: {
            type: DataTypes.STRING(30),
            alowNull: false,
            unique: true,
            primaryKey: true
        },
        id: {
            type: DataTypes.STRING(14),
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