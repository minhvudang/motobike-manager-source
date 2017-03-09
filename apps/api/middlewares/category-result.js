exports.getCategories = function(req, res) {
    if(res.categories) {
        return res.status(200).send(res.categories)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.createCategory = function(req, res) {
    if(res.category) {
        return res.status(200).send(res.category);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to created'
        })
    }
}