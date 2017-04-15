module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Service', {
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
        image: {
            type: DataTypes.STRING(30),
            alowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            alowNull: false
        },
        type: {
            type: DataTypes.STRING(20),
            alowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            alowNull: false
        },
        sale: {
            type: DataTypes.INTEGER,
            alowNull: false
        }
    })
}