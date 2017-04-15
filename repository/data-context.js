var Sequelize = require('sequelize');

var DataContext = function(config) {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var Agency = sequelize.import('./models/agency');
    var Customer = sequelize.import('./models/customer');
    var Maintanance = sequelize.import('./models/maintanance');
    var Yogurt = sequelize.import('./models/yogurt');
    var Service = sequelize.import('./models/service');

    return {
        Agency : Agency,
        Customer : Customer,
        Maintanance : Maintanance,
        Yogurt : Yogurt,
        Service : Service,
        sequelize: sequelize
    }
}

module.exports = DataContext;