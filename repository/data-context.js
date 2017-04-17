var Sequelize = require('sequelize');

var DataContext = function(config) {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var Agency = sequelize.import('./models/agency');
    var Customer = sequelize.import('./models/customer');
    var Maintanance = sequelize.import('./models/maintanance');
    var Yogurt = sequelize.import('./models/yogurt');

    return {
        Agency : Agency,
        Customer : Customer,
        Maintanance : Maintanance,
        Yogurt : Yogurt,
        sequelize: sequelize
    }
}

module.exports = DataContext;