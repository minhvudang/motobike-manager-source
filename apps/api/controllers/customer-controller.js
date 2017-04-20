var dependencies = {
    customerRepository: null, 
    customerWriteService: null
}

function CustomerController(customerWriteService, customerRepository) {
    dependencies.customerRepository = customerRepository;
    dependencies.customerWriteService = customerWriteService;
}

CustomerController.prototype.getCustomer = function (req, res, next) {
    var customerId = req.params.customerId;
    var select = req.fields ? req.fields.split(" ") : [];

    dependencies.customerRepository.findById(customerId, select, function (err, customer) {
        if (err) {
            next(err);
        } else {
            res.customer = customer;
            next();
        }
    });
}

CustomerController.prototype.getCustomers = function (req, res, next) {
    var select = req.fields ? req.fields.split(" ") : [];
    var limit = req.options.limit;
    var page = req.options.skip;
    var condition = req.where;
    var orderBy = req.options.sort;

    dependencies.customerRepository.findAll(condition, orderBy, select, page, limit, function (err, customers) {
        if (err) {
            next(err);
        } else {
            res.customers = customers;
            next();
        }
    });
}

CustomerController.prototype.updateCustomer = function (req, res, next) {
    var customerId = req.params.customerId;
    var customerObj = req.body;
    customerObj.id = customerId;

    dependencies.customerWriteService.update(customerObj, function(err, success) {
        if(err) {
            next(err);
        } else {
            res.success = success;
            next();
        }
    });
}

CustomerController.prototype.createCustomer = function (req, res, next) {
    var customerObj = req.body;

    dependencies.customerWriteService.create(customerObj, function(err, customer) {
        if(err) {
            next(err);
        } else {
            res.customer = customer;
            next();
        }
    });
}

CustomerController.prototype.addService = function (req, res, next) {
    var customerId = req.params.customerId;
    var agencyId = req.query.agencyId;
    var serviceId = req.query.serviceId;

    dependencies.customerWriteService.addService(customerId, agencyId, serviceId , function(err, customer) {
        if(err) {
            next(err);
        } else {
            res.customer = customer;
            next();
        }
    });
}

module.exports = CustomerController;