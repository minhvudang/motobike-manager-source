var customerResultMiddleWare = require('../middlewares/customer-result');

module.exports = function(app, customerController){
    app.route('/customers/:customerId/service')
        .put(customerController.addService,
            customerResultMiddleWare.addService);
    app.route('/customers/:customerId')
        .get(customerController.getCustomer,
            customerResultMiddleWare.getCustomer)
        .put(customerController.updateCustomer,
            customerResultMiddleWare.updateCustomer);
    app.route('/customers')
        .get(customerController.getCustomers, 
             customerResultMiddleWare.getCustomers)
        .post(customerController.createCustomer, 
              customerResultMiddleWare.createCustomer);
}