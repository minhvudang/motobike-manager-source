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
        produce: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        motoType: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        address: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        phoneNumber: {
            type: DataTypes.INTEGER(12),
            alowNull: false
        },
        agencies: {
            type: DataTypes.TEXT,
            alowNull: false
        }
    })
}