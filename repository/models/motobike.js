module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Motobike', {
        id: {
            type: DataTypes.STRING(14),
            unique: true,
            primaryKey: true,
            alowNull: false
        },
        owner: {
            type: DataTypes.TEXT,
            alowNull: false
        },
        type: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            alowNull: false
        }
    })
}