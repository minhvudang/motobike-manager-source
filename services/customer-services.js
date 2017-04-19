var Customer = require('../domain-models/model/customer');

var CustomerService = function (customerRepository) {
    this.customerRepository = customerRepository;
}

CustomerService.prototype.create = function (customerProps, callback) {
    var self = this;
    var customerInstance = null;

    try {
        customerInstance = new Customer(customerProps);
    } catch (err) {
        return callback({
            type: 'Bad Request',
            err: err
        });
    };

    self.customerRepository.save(customerInstance, function (err, customer) {
        if (err) return callback(err);
    
        return callback(null, customerInstance);
    });
}

CustomerService.prototype.update = function (customerProps, callback) {
    var self = this;
    var customerObj = null;
    var customerInstance = null;
    var changedPropsObj = null;

    self.customerRepository.findById(customerProps.id, null, function (err, customerObj) {
        if (err) return callback(err);
        else if (!customerObj) return callback({
            type: 'Not Found'
        });

        try {
            customerInstance = new Customer(customerObj);
            changedPropsObj = customerInstance.update(customerProps);
        } catch (err) {
            return callback({
                type: 'Bad Request',
                err: err
            });
        };

        self.customerRepository.update(customerInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })

            return callback(null, customerInstance);
        });
    });
}