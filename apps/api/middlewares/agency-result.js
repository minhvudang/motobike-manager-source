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
            msg: 'nothing to added'
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