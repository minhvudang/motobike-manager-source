module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Agency', {
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
        avatar: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        address: {
            type: DataTypes.STRING(50),
            alowNull: false
        },
        location: {
            type: DataTypes.STRING(50),
            alowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            alowNull: false
        },
        tax: {
            type: DataTypes.STRING(20),
            alowNull: true
        },
        rating: {
            type: DataTypes.FLOAT,
            alowNull: false
        },
        description: {
            type: DataTypes.STRING(20),
            alowNull: false
        },
        services: {
            type: DataTypes.TEXT,
            alowNull: false
        }
    })
}