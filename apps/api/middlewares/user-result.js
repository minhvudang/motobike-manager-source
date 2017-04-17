exports.getUser = function (req, res) {
    if (res.user) {
        return res.status(200).send(res.user)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.updateUser = function (req, res) {
    if (res.updatedUser) {
        return res.status(200).send(res.updatedUser)
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing is updated'
        })
    }
}

exports.createUser = function(req, res) {
    if (res.user) {
        return res.status(200).send(res.user);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to created'
        })
    }
}