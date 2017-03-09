exports.getCourse = function(req, res) {
    if(res.course) {
        return res.status(200).send(res.course)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.getCourses = function(req, res) {
    if(res.courses) {
        return res.status(200).send(res.courses)
    } else {
        return res.status(404).send({
            msg: 'Not Found'
        })
    }
}

exports.createCourse = function(req, res) {
    if(res.course) {
        return res.status(200).send({
            result: true,
            msg: 'course is created'
        })
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing is created'
        })
    }
}

exports.updateCourse = function(req, res) {
     if(res.success) {
        return res.status(200).send({
            result: true,
            msg: 'course is updated'
        })
    } else {
        return res.status(404).send({
            result: false,
            msg: 'nothing is updated'
        })
    }
}

