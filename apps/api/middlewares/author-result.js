exports.getAuthor = function (req, res) {
    if (res.author) {
        return res.status(200).send(res.author)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.getAuthors = function (req, res) {
    if (res.authors) {
        return res.status(200).send(res.authors)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.updateAuthor = function (req, res) {
    if (res.updatedAuthor) {
        return res.status(200).send(res.updatedAuthor)
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing is updated'
        })
    }
}

exports.createAuthor = function(req, res) {
    if (res.author) {
        return res.status(200).send(res.author);
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing to created'
        })
    }
}