var Sequelize = require('sequelize');

var DataContext = function(config) {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var Motobike = sequelize.import('./models/motobike');

    return {
        Motobike: Motobike,
        sequelize: sequelize
    }
}

module.exports = DataContext;