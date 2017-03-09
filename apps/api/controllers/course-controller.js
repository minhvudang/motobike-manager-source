var dependencies = {
    courseRepository: null, 
    courseWriteService: null
}

function CourseController(courseWriteService, courseRepository) {
    dependencies.courseRepository = courseRepository;
    dependencies.courseWriteService = courseWriteService;
}

CourseController.prototype.getCourse = function (req, res, next) {
    var courseId = req.params.courseId;
    var select = req.fields ? req.fields.split(" ") : [];

    dependencies.courseRepository.findById(courseId, select, function (err, course) {
        if (err) {
            next(err);
        } else {
            res.course = course;
            next();
        }
    });
}

CourseController.prototype.getCourses = function (req, res, next) {
    var select = req.fields ? req.fields.split(" ") : [];
    var limit = req.options.limit;
    var page = req.options.skip;
    var condition = req.where;
    var orderBy = req.options.sort;

    dependencies.courseRepository.findAll(condition, orderBy, select, page, limit, function (err, courses) {
        if (err) {
            next(err);
        } else {
            res.courses = courses;
            next();
        }
    });
}

CourseController.prototype.updateCourse = function (req, res, next) {
    var courseId = req.params.courseId;
    var courseObj = req.body;

    dependencies.courseWriteService.update(courseId, courseObj, function(err, success) {
        if(err) {
            next(err);
        } else {
            res.success = success;
            next();
        }
    });
}

CourseController.prototype.createCourse = function (req, res, next) {
    var courseObj = req.body;

    dependencies.courseWriteService.update(courseObj, function(err, course) {
        if(err) {
            next(err);
        } else {
            res.course = course;
            next();
        }
    });
}

CourseController.prototype.addChapter = function (req, res,next ) {

}

CourseController.prototype.updateChapter = function (res, res, next) {

}

CourseController.prototype.addUnit = function (req, res, next) {

}

CourseController.prototype.updateUnit = function (req, res, next) {

}

CourseController.prototype.toggleState = function (req, res, next) {
    
}

module.exports = CourseController;