var Course = require('../../domain-models/course/course');
var CourseEvents = require('../../domain-models/events/course-events');

var options = {};

var CourseViewGenerator = function(courseRepository) {
    options.courseRepository = courseRepository;
}

CourseViewGenerator.prototype.handler = function(message, callback) {
    switch(message.type) {
        case CourseEvents.COURSE_CREATED:
            CourseCreatedHandler(message.data, callback);
            break;
        case CourseEvents.COURSE_UPDATED:
            CourseUpdatedHandler(message.data, callback);
            break;
        case CourseEvents.COURSE_PUBLISHED:
            CoursePublishedHandler(message.data, callback);
            break;
        case CourseEvents.COURSE_UNPUBLISHED:
            CourseUnpublishedHandler(message.data, callback);
            break;
        case CourseEvents.CHAPTER_ADDED:
            ChapterAddedHandler(message.data, callback);
            break;
        case CourseEvents.CHAPTER_UPDATED:
            ChapterUpdatedHandler(message.data, callback);
            break;
        case CourseEvents.UNIT_ADDED:
            UnitAddedHandler(message.data, callback);
            break;
        case CourseEvents.UNIT_UPDATED:
            UnitUpdatedHandler(message.data, callback);
            break;
    }
}

function CourseCreatedHandler(message, callback) {
    
}

function CourseUpdatedHandler(message, callback) {

}

function CoursePublishedHandler(message, callback) {

}

function CourseUnpublishedHandler(message, callback) {

}

function ChapterAddedHandler(message, callback) {

}

function ChapterUpdatedHandler(message, callback) {

}

function UnitAddedHandler(message, callback) {

}

function UnitUpdatedHandler(message, callback) {

}

module.exports = CourseViewGenerator;