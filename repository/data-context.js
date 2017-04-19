var Sequelize = require('sequelize');

var DataContext = function(config) {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);

    var Agency = sequelize.import('./models/agency');
    var Customer = sequelize.import('./models/customer');
    var User = sequelize.import('./models/user');

    return {
        Agency : Agency,
        Customer : Customer,
        User: User,
        sequelize: sequelize
    }
}

module.exports = DataContext;