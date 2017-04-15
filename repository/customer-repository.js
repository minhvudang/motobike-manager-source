var objectAssign = require('object-assign');

var CustomerRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Customer = dbContext.Customer;
}

CustomerRepository.prototype.findById = function(id, select, callback) {
    this.Customer
        .findOne({
            attributes: select.length ? select : null,
            where: { 'id': id }
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Customer
        .findAll({
            attributes: select.length ? select : null,
            limit: limit,
            offset: page * limit
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.save = function(customerObj, callback) {
    this.Customer
        .create(customerObj)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = CustomerRepository;
