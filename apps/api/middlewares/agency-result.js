exports.getAgency = function(req, res) {
    if(res.agency) {
        return res.status(200).send(res.agency)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.getAgencies = function(req, res) {
    if(res.agencies) {
        return res.status(200).send(res.agencies)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.getService = function(req, res) {
    if(res.service) {
        return res.status(200).send(res.service);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'Not Found'
        })
    }
}

exports.createAgency = function(req, res) {
    if(res.agency) {
        return res.status(200).send(res.agency);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to created'
        })
    }
}

exports.updateAgency = function(req, res) {
    if(res.success) {
        return res.status(200).send(res.success);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to updated'
        })
    }
}

exports.addService = function(req, res) {
    if(res.result) {
        return res.status(200).send(res.result);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to added'
        })
    }
}

exports.updateService = function(req, res) {
    if(res.result) {
        return res.status(200).send(res.result);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to updated'
        })
    }
}

exports.deleteService = function(req, res) {
    if(res.result) {
        return res.status(200).send(res.result);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to deleted'
        })
    }
}