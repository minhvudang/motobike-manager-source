module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Customer', {
        id: {
            type: DataTypes.STRING(14),
            unique: true,
            primaryKey: true,
            alowNull: false
        },
        name: {
            type: DataTypes.STRING(14),
            alowNull: false
        },
        motorbikeMaker: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        motorbikeName: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        numberOfKmWent: {
            type: DataTypes.INTEGER,
            alowNull: false
        },
        address: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(12),
            alowNull: false
        }
    })
}