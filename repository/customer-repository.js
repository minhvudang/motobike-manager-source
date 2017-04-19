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
            if(result.agencies) {
                result.agencies = JSON.parse(result.agencies);
            }
        })
        .catch(function(err) {
            callback(err, null);
        });
}

CustomerRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Customer
        .findAll({
            attributes: select.length ? select : {exclude: ['agencies']},
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

CustomerRepository.prototype.update = function(id, customerObj, callback) {
    this.Customer
        .update(objectAssign(
            {},
            customerObj,
            { agencies: JSON.stringify(customerObj.agencies) }
        ), { 
            where: { 'id': id } 
        })
        .then(function(result) {
            if(result.every(function(val){
                return val == 1;
            })){
                callback(null, true);
            }else{
                callback(null, false);
            }
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = CustomerRepository;
