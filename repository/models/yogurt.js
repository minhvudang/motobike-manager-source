module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Yogurt', {
        id: {
            type: DataTypes.STRING(14),
            unique: true,
            primaryKey: true,
            alowNull: false
        },
        date: {
            type: DataTypes.STRING(14),
            alowNull: false
        },
        detailedRepair: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            alowNull: false
        },
        idStore: {
            type: DataTypes.INTEGER,
            alowNull: false
        },
        nameStore: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        currentKM: {
            type: DataTypes.INTEGER,
            alowNull: false
        }
    })
}