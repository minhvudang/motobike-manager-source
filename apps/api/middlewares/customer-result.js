exports.getCustomer = function(req, res) {
    if(res.customer) {
        return res.status(200).send(res.customer)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.getCustomers = function(req, res) {
    if(res.customers) {
        return res.status(200).send(res.customers)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.createCustomer = function(req, res) {
    if(res.customer) {
        return res.status(200).send(res.customer);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to created'
        })
    }
}