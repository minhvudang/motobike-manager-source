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
            if(result.agencies) {
                result.agencies = JSON.parse(result.agencies);
            }
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.findAll = function(condition, orderBy, select, page, limit, callback) {
    this.Customer
        .findAll({
            attributes: select.length ? select : {exclude: ['agencies']},
            where: condition ? condition : null,
            order: orderBy ? orderBy : null,
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
        .create(objectAssign(
            {},
            customerObj,
            { agencies: JSON.stringify(customerObj.agencies) }
        ))
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.update = function(customerObj, callback) {
    this.Customer
        .update(objectAssign(
            {},
            customerObj,
            { agencies: JSON.stringify(customerObj.agencies) }
        ), { 
            where: { 'id': customerObj.id } 
        })
        .then(function(result) {
                callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = CustomerRepository;
