var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');

var DataContext = require('../../../repository/blob-store/data-context');
var BlobRepository = require('../../../repository/blob-store/blob-repository');
var config = require('../../../config/config');

var dataContext = DataContext(config.blobStore);
var blobRepository = new BlobRepository(dataContext);

describe('Save new Blob', function() {
    it('must persist success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var categoryId = shortid.generate();
            var courseId = shortid.generate();

            var course = {
                id: courseId,
                title: 'Course Test',
                description: 'Mo ta',
                authorId: authorId,
                categoryId: categoryId,
                originPrice: 1000000,
                sellPrice: 500000,
                chapters: [{ 
                    name: 'Chapter 1',
                    units: [{
                        name: 'Unit 1',
                        duration: 120,
                        source: '/test.mp3'
                    }]
                }]
            };

            blobRepository.save('Course', course, function(err, blobCourse) {
                var courseJson = JSON.stringify(course);
                var blobCourseJson = JSON.stringify(blobCourse);

                assert.equal(courseJson, blobCourseJson);
                done();
            })
        })
    })
})

describe('Save duplicate Blob', function() {
    it('raise error', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var categoryId = shortid.generate();
            var courseId = shortid.generate();

            var course = {
                id: courseId,
                title: 'Course Test',
                description: 'Mo ta',
                authorId: authorId,
                categoryId: categoryId,
                originPrice: 1000000,
                sellPrice: 500000,
                chapters: [{ 
                    name: 'Chapter 1',
                    units: [{
                        name: 'Unit 1',
                        duration: 120,
                        source: '/test.mp3'
                    }]
                }]
            };

            blobRepository.save('Course', course, function(err, blobCourse) {
                blobRepository.save('Course', course, function(err, blobCourse) {
                    assert.isObject(err);

                    done();
                })
            })
        })
    })
})

describe('Find exist Blob Data', function() {
    it('get correct data', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var categoryId = shortid.generate();
            var courseId = shortid.generate();

            var course = {
                id: courseId,
                title: 'Course Test',
                description: 'Mo ta',
                authorId: authorId,
                categoryId: categoryId,
                originPrice: 1000000,
                sellPrice: 500000,
                chapters: [{ 
                    name: 'Chapter 1',
                    units: [{
                        name: 'Unit 1',
                        duration: 120,
                        source: '/test.mp3'
                    }]
                }]
            };

            blobRepository.save('Course', course, function(err, blobCourse) {
                blobRepository.find('Course', course.id, function(err, courseObj) {
                    var t = JSON.stringify(course);
                    var t1 = JSON.stringify(courseObj);

                    assert.equal(t, t1);
                    done();
                })
            });
        })
    })
})

describe('Find not exist Blob Data', function() {
    it('get nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseId = 'not-exist-123213412r';
            blobRepository.find('Course', courseId, function(err, courseObj) {
                assert.equal(courseObj, null);

                done();
            })
        })
    })
})

describe('Update exist Blob Data', function() {
    it('update success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var categoryId = shortid.generate();
            var courseId = shortid.generate();

            var course = {
                id: courseId,
                title: 'Course Test',
                description: 'Mo ta',
                authorId: authorId,
                categoryId: categoryId,
                originPrice: 1000000,
                sellPrice: 500000,
                chapters: [{ 
                    name: 'Chapter 1',
                    units: [{
                        name: 'Unit 1',
                        duration: 120,
                        source: '/test.mp3'
                    }]
                }]
            };

            blobRepository.save('Course', course, function(err, blobCourse) {
                course.description = 'Mo ta 1';
                course.chapters[0].name = 'Chapter 2';
                course.chapters[0].units[0].name = 'Unit 2';

                blobRepository.update('Course', course, function(err, result) {
                    blobRepository.find('Course', course.id, function(err, blobCourse) {
                        var t = JSON.stringify(course);
                        var t1 = JSON.stringify(blobCourse);

                        assert.equal(result, true);
                        assert.equal(t, t1);

                        done();
                    })
                })
            })
        })
    })
})

describe('Update not exist Blob Data', function() {
    it('do nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseId = 'not-exist-12321';
            var authorId = shortid.generate();
            var categoryId = shortid.generate();
            var courseId = shortid.generate();

            var course = {
                id: courseId,
                title: 'Course Test',
                description: 'Mo ta',
                authorId: authorId,
                categoryId: categoryId,
                originPrice: 1000000,
                sellPrice: 500000,
                chapters: [{ 
                    name: 'Chapter 1',
                    units: [{
                        name: 'Unit 1',
                        duration: 120,
                        source: '/test.mp3'
                    }]
                }]
            };


            blobRepository.update('Course', course, function(err, result) {
                assert.equal(result, false);
                done();
            })
        })
    })
})