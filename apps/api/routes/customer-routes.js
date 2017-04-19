var customerResultMiddleWare = require('../middlewares/customer-result');

module.exports = function(app, customerController){
    app.route('/customers')
        .get(customerController.getCustomers, 
             customerResultMiddleWare.getCustomers)
        .post(customerController.createCustomer, 
              customerResultMiddleWare.createCustomer);
    app.route('/customers/:customerId')
        .get(customerController.getCustomer,
            customerResultMiddleWare.getCustomer)
        .put(customerController.updateCustomer,
            customerResultMiddleWare.updateCustomer);
}