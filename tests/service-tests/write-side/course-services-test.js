var chai = require('chai');
var assert = chai.assert;
var shortid = require('shortid');

var CourseService = require('../../../services/write-services/course-services');
var UnitType = require('../../../domain-models/course/unit-type');

var mockMessageBus = {
    send: function(payload, callback) {
        callback(null, payload);
    },
    publish: function(payload, callback){
        callback(null, payload);
    }
}


describe('Create new Course', function() {
    it('persist success and correctly', function() {
        var mockBlobStorage = {
            save: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        courseService.create({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        }, function(err, course) {
            assert.isString(course.id);
            assert.equal(course.title, 'Course Test');
            assert.equal(course.description, 'Mo ta');
            assert.equal(course.authorId, authorId);
            assert.equal(course.categoryId, categoryId);
            assert.equal(course.originPrice, 1000000);
            assert.equal(course.sellPrice, 500000);
        })
    })
})

describe('Create duplicate Course', function() {
    it('raise error', function() {
        var mockBlobStorage = {
            save: function(model, course, callback) {
                callback('Duplicate men');
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        courseService.create({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        }, function(err, course) {
            assert.equal(err, 'Duplicate men');
        })
    })
})

describe('Publish exist Course', function() {
    it('update success and correctly', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'UNPUBLISH',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                })
            },
            update: function(model, course, callback) {
                callback(null, course);
            },
            save: function(model, course, callback){
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.publish(courseId, function(err, course) {
            assert.equal(course.state, 'PUBLISHED');
        })
    })
})

describe('Publish not exist Course', function() {
    it('raise warning', function() {
        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null)
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.publish('not_exist2343', function(err, course) {
            assert.equal(course, null);
        })
    })
})

describe('Unpublish exist Course', function() {
    it('update success and correctly', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'PUBLISHED',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                })
            },
            update: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.unpublish(courseId, function(err, course) {
            assert.equal(course.state, 'UNPUBLISH');
        })
    })
})

describe('Unpublish not exist Course', function() {
    it('raise warning', function() {
        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null)
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.unpublish('not_exist2343', function(err, course) {
            assert.equal(course, null);
        })
    })
})

describe('Update exist Course', function() {
    it('update success and correctly', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'UNPUBLISH',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                })
            },
            update: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.update({
            title: 'Course Not Test',
            description: 'Mo ta 1',
            authorId: 'asdklha',
            categoryId: '237434',
            originPrice: 900000,
            sellPrice: 400000
        }, function(err, course) {
            assert.equal(course.title, 'Course Not Test');
            assert.equal(course.description, 'Mo ta 1');
            assert.equal(course.authorId, authorId);
            assert.equal(course.categoryId, '237434');
            assert.equal(course.originPrice, 900000);
            assert.equal(course.sellPrice, 400000);
            assert.equal(course.chapters.length, 2);
            assert.equal(course.totalDuration, 210);
            assert.equal(course.state, 'UNPUBLISH');
        })
    })
})

describe('Update not exist Course', function() {
    it('raise warning', function() {
        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null);
            },
            update: function(model, course, callback) {
                callback(null, false);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.update({
            title: 'Course Not Test',
            description: 'Mo ta 1',
            authorId: 'asdklha',
            categoryId: '237434',
            originPrice: 900000,
            sellPrice: 400000
        }, function(err, course) {
            assert.equal(course, null);
            assert.equal(err.type, 'Not Found');
        })
    })
})

describe('Add Chapter to exist Course', function() {
    it('persist success and correctly', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000
                });
            },
            update: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.addChapter({ 
            courseId: courseId,
            name: 'Chapter 1' 
        }, function(err, course) {
            assert.equal(course.title, 'Course Test');
            assert.equal(course.description, 'Mo ta');
            assert.equal(course.authorId, authorId);
            assert.equal(course.categoryId, categoryId);
            assert.equal(course.originPrice, 1000000);
            assert.equal(course.sellPrice, 500000);
            assert.equal(course.chapters.length, 1);
            assert.equal(course.totalDuration, 0);
            assert.equal(course.state, 'UNPUBLISH');
            assert.equal(course.chapters[0].name, 'Chapter 1');
            assert.equal(course.chapters[0].courseId, course.id);
            assert.isString(course.chapters[0].id);
        })
    })
})

describe('Add Chapter to not exist Course', function() {
    it('raise warning', function() {
        var courseId = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null);
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.addChapter({ 
            courseId: courseId,
            name: 'Chapter 1' 
        }, function(err, course) {
            assert.equal(course, null);
        })
    })
})

describe('Update exist Chapter from exist Course', function() {
    it('update success and correctly', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'UNPUBLISH',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                });
            },
            update: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.updateChapter({ 
            courseId: courseId,
            id: chapterId,
            name: 'Chapter 2' 
        }, function(err, course) {
            assert.equal(course.chapters[0].name, 'Chapter 2');
        })
    })
})

describe('Update not exist Chapter from exist Course', function() {
    it('raise warning', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'UNPUBLISH',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                });
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.updateChapter({ 
            courseId: courseId,
            id: 'not_exist124234',
            name: 'Chapter 1' 
        }, function(err, course) {
            assert.equal(course, null);
        })
    })
})

describe('Update Chapter from not exist Course', function() {
    it('raise warning', function() {
        var courseId = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null);
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.updateChapter({ 
            courseId: courseId,
            chapterId: shortid.generate(),
            name: 'Chapter 1' 
        }, function(err, course) {
            assert.equal(course, null);
        })
    })
})

describe('Add Unit to exist Course and Chapter', function() {
    it('persist success and correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1'      
                        }
                    ]
                });
            },
            update: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.addUnit({
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        }, function(err, course) {
            assert.equal(course.title, 'Course Test');
            assert.equal(course.description, 'Mo ta');
            assert.equal(course.authorId, authorId);
            assert.equal(course.categoryId, categoryId);
            assert.equal(course.originPrice, 1000000);
            assert.equal(course.sellPrice, 500000);
            assert.equal(course.chapters.length, 1);
            assert.equal(course.totalDuration, 120);
            assert.equal(course.totalUnit, 1);
            assert.equal(course.state, 'UNPUBLISH');
            assert.equal(course.chapters[0].name, 'Chapter 1');
            assert.equal(course.chapters[0].courseId, courseId);
            assert.equal(course.chapters[0].id, chapterId);
            assert.equal(course.chapters[0].units.length, 1);
            assert.isString(course.chapters[0].units[0].id);
            assert.equal(course.chapters[0].units[0].name, 'Unit 1');
            assert.equal(course.chapters[0].units[0].courseId, courseId);
            assert.equal(course.chapters[0].units[0].chapterId, chapterId);
            assert.equal(course.chapters[0].units[0].duration, 120);
            assert.equal(course.chapters[0].units[0].type, UnitType.AUDIO);
            assert.equal(course.chapters[0].units[0].source, '/test.mp3')
        })
    })
})

describe('Add Unit to not exist Course or Chapter', function() {
    it('raise warning', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null);
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.addUnit({
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        }, function(err, course) {
            assert.equal(course, null);
        })

        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();

        mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null);
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.addUnit({
            chapterId: 'not_exist13241234',
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        }, function(err, result) {
            assert.equal(result, null);
        })
    })
})

describe('Update exist Unit from exist Course and Chapter', function() {
    it('update success and correctly', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'UNPUBLISH',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                })
            },
            update: function(model, course, callback) {
                callback(null, course);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.updateUnit({
            id: unitId1,
            courseId: courseId,
            chapterId: chapterId,
            name: 'Unit A',
            type: 'VIDEO',
            duration: 90,
            source: '/test.mp4'
        }, function(err, course) {
            assert.equal(course.title, 'Course Test');
            assert.equal(course.description, 'Mo ta');
            assert.equal(course.authorId, authorId);
            assert.equal(course.categoryId, categoryId);
            assert.equal(course.originPrice, 1000000);
            assert.equal(course.sellPrice, 500000);
            assert.equal(course.chapters.length, 2);
            assert.equal(course.totalDuration, 180);
            assert.equal(course.state, 'UNPUBLISH');
            assert.isString(course.chapters[0].units[0].id);
            assert.equal(course.chapters[0].units[0].id, unitId1);
            assert.equal(course.chapters[0].units[0].name, 'Unit A');
            assert.equal(course.chapters[0].units[0].courseId, courseId);
            assert.equal(course.chapters[0].units[0].chapterId, chapterId);
            assert.equal(course.chapters[0].units[0].duration, 90);
            assert.equal(course.chapters[0].units[0].type, UnitType.VIDEO);
            assert.equal(course.chapters[0].units[0].source, '/test.mp4');
        })
    })
})

describe('Update not exist Unit from exist Course and Chapter', function() {
    it('raise warning', function() {
        var courseId = shortid.generate();
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: courseId,
                    title: 'Course Test',
                    description: 'Mo ta',
                    state: 'UNPUBLISH',
                    totalDuration: 210,
                    authorId: authorId,
                    categoryId: categoryId,
                    originPrice: 1000000,
                    sellPrice: 500000,
                    chapters: [
                        {
                            id: chapterId,
                            name: 'Chapter 1',
                            courseId: courseId,
                            totalDuration: 120,
                            units: [
                                {
                                    id: unitId1,
                                    name: 'Unit 1',
                                    chapterId: chapterId,
                                    courseId: courseId,
                                    type: 'AUDIO',
                                    duration: 120,
                                    source: '/test.mp3'
                                }
                            ]
                        },
                        {
                            id: chapterId1,
                            name: 'Chapter 2',
                            courseId: courseId,
                            totalDuration: 90,
                            units: [
                                {
                                    id: unitId2,
                                    name: 'Unit 1',
                                    chapterId: chapterId1,
                                    courseId: courseId,
                                    type: 'VIDEO',
                                    duration: 90,
                                    source: '/test.mp4'
                                }
                            ]
                        }
                    ]
                })
            },
            update: function(model, course, callback) {
                callback(null, true);
            }
        }

        var courseService = new CourseService(mockBlobStorage, mockMessageBus);

        courseService.updateUnit({
            id: 'not_exist124234',
            courseId: courseId,
            chapterId: chapterId,
            name: 'Unit A',
            type: 'VIDEO',
            duration: 90,
            source: '/test.mp4'
        }, function(err, result) {
            assert.equal(result, null);
        })
    })
})