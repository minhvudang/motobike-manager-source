var courseResultMiddleWare = require('../middlewares/course-result');

module.exports = function(app, courseController){
    app.route('/courses/:courseId')
        .get(courseController.getCourse, 
             courseResultMiddleWare.getCourse)
        .put(courseController.updateCourse, 
             courseResultMiddleWare.courseAuthor);
    app.get('/courses', 
            courseController.getCourses, 
            courseResultMiddleWare.getCourses)
       .post(courseController.createCourse, 
             courseResultMiddleWare.createCourse);
}
