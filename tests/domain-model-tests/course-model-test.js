var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');

var Unit = require('../../domain-models/course/unit');
var UnitType = require('../../domain-models/course/unit-type');
var Chapter = require('../../domain-models/course/chapter');
var Course = require('../../domain-models/course/course');
var CourseState = require('../../domain-models/course/course-state');

describe('Create new Course with empty Chapter', function() {
    it('must return new Course with random id, empty Chapter and correct property', function () {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        });

        assert.isString(course.id);
        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 0);
        assert.equal(course.totalChapter, 0);
        assert.equal(course.totalUnit, 0);
        assert.equal(course.totalDuration, 0);
        assert.equal(course.state, 'UNPUBLISH');

        course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId
        });

        assert.isString(course.id);
        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 0);
        assert.equal(course.sellPrice, 0);
        assert.equal(course.chapters.length, 0);
        assert.equal(course.totalDuration, 0);
        assert.equal(course.totalChapter, 0);
        assert.equal(course.totalUnit, 0);
        assert.equal(course.state, 'UNPUBLISH');

        try {
            new Course({
                title: '',
                description: '',
                categoryId: categoryId,
                originPrice: -1
            });
        } catch(Error) {
            var invalidProps = ['title', 'description', 'originPrice', 'authorId'];
            var validProps = ['categoryId', 'sellPrice'];

            Error.forEach(function (e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 4);
        }
    })
})

describe('Create new Course with Chapter', function() {
    it('must return new Course with random id and correct property', function () {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000,
            chapters: [{ name: 'Chapter 1' }]
        });

        assert.isString(course.id);
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
    })
})

describe('Create new Course with Chapter and Unit', function () {
    it('must return new Course with random id and correct property', function () {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000,
            chapters: [{
                name: 'Chapter 1',
                units: [
                    {
                        name: 'Unit 1',
                        type: 'AUDIO',
                        duration: 120,
                        source: '/test.mp3'
                    }
                ]
            }]
        });

        assert.isString(course.id);
        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 1);
        assert.equal(course.totalDuration, 120);
        assert.equal(course.state, 'UNPUBLISH');
        assert.equal(course.chapters[0].name, 'Chapter 1');
        assert.equal(course.chapters[0].courseId, course.id);
        assert.equal(course.chapters[0].totalDuration, 120);
        assert.equal(course.chapters[0].units.length, 1);
        assert.isString(course.chapters[0].units[0].id);
        assert.equal(course.chapters[0].units[0].chapterId, course.chapters[0].id);
        assert.equal(course.chapters[0].units[0].courseId, course.id);
        assert.equal(course.chapters[0].units[0].type, 'AUDIO');
        assert.equal(course.chapters[0].units[0].duration, 120);
        assert.equal(course.chapters[0].units[0].source, '/test.mp3');
    })
})

describe('Serialize Course from Object', function() {
    it('must return Course equal Object', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var persistObj = {
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
        }

        var course = new Course(persistObj);
        assert.equal(course.id, courseId);
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.state, 'PUBLISHED');
        assert.equal(course.totalDuration, 210);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 2);

        assert.equal(course.chapters[0].id, chapterId);
        assert.equal(course.chapters[0].name, 'Chapter 1');
        assert.equal(course.chapters[0].courseId, courseId);
        assert.equal(course.chapters[0].totalDuration, 120);
        assert.equal(course.chapters[0].units.length, 1);
        assert.equal(course.chapters[0].units[0].id, unitId1);
        assert.equal(course.chapters[0].units[0].chapterId, chapterId);
        assert.equal(course.chapters[0].units[0].courseId, courseId);
        assert.equal(course.chapters[0].units[0].type, 'AUDIO');
        assert.equal(course.chapters[0].units[0].duration, 120);
        assert.equal(course.chapters[0].units[0].source, '/test.mp3');

        assert.equal(course.chapters[1].id, chapterId1);
        assert.equal(course.chapters[1].name, 'Chapter 2');
        assert.equal(course.chapters[1].courseId, courseId);
        assert.equal(course.chapters[1].totalDuration, 90);
        assert.equal(course.chapters[1].units.length, 1);
        assert.equal(course.chapters[1].units[0].id, unitId2);
        assert.equal(course.chapters[1].units[0].chapterId, chapterId1);
        assert.equal(course.chapters[1].units[0].courseId, courseId);
        assert.equal(course.chapters[1].units[0].type, 'VIDEO');
        assert.equal(course.chapters[1].units[0].duration, 90);
        assert.equal(course.chapters[1].units[0].source, '/test.mp4');
    })
})

describe('Update Course', function() {
    it('property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        });

        var newId = course.id;

        var updatedCourse = course.update({
            title: 'Course Not Test',
            description: 'Mo ta 1',
            authorId: 'asdklha',
            categoryId: '237434',
            originPrice: 900000,
            sellPrice: 400000
        });

        assert.isString(course.id);
        assert.equal(course.id, newId);
        assert.equal(course.title, 'Course Not Test');
        assert.equal(course.description, 'Mo ta 1');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, '237434');
        assert.equal(course.originPrice, 900000);
        assert.equal(course.sellPrice, 400000);
        assert.equal(course.chapters.length, 0);
        assert.equal(course.totalDuration, 0);
        assert.equal(course.state, 'UNPUBLISH');

        assert.equal(updatedCourse.id, newId);
        assert.equal(updatedCourse.title, 'Course Not Test');
        assert.equal(updatedCourse.description, 'Mo ta 1');
        assert.equal(updatedCourse.categoryId, '237434');
        assert.equal(updatedCourse.originPrice, 900000);
        assert.equal(updatedCourse.sellPrice, 400000);
    })
})

describe('Add Chapter to Course', function() {
    it('add Chapter and property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        });

        var changed = course.addChapter({ name: 'Chapter 1' });

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

        assert.equal(changed.id, course.id);
        assert.equal(changed.totalChapter, 1);

        var addedChapter = changed.chapter;
        assert.isString(addedChapter.id);
        assert.equal(addedChapter.units.length, 0);
        assert.equal(addedChapter.totalDuration, 0);
        assert.equal(addedChapter.totalUnit, 0);
        assert.equal(addedChapter.name, 'Chapter 1');
    })
})

describe('Update exist Chapter', function() {
    it('property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        });

        course.addChapter({ name: 'Chapter 1' })

        var updatedChapter = course.updateChapter({
            id: course.chapters[0].id,
            name: 'Chapter A'
        })

        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 1);
        assert.equal(course.totalDuration, 0);
        assert.equal(course.state, 'UNPUBLISH');
        assert.equal(course.chapters[0].name, 'Chapter A');
        assert.equal(course.chapters[0].courseId, course.id);
        assert.isString(course.chapters[0].id);
        
        assert.equal(updatedChapter.chapter.id, course.chapters[0].id);
        assert.equal(updatedChapter.chapter.name, 'Chapter A');
    })
})

describe('Update not exist Chapter', function() {
    it('do nothing', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();

        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: authorId,
            categoryId: categoryId,
            originPrice: 1000000,
            sellPrice: 500000
        });

        course.addChapter({ name: 'Chapter 1' })

        var updatedChapter = course.updateChapter({
            chapterId: '124sdsf',
            name: 'Chapter A'
        })

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

        assert.equal(updatedChapter, null);
    })
})

describe('Add Unit to Course Chapter', function() {
    it('add Unit and property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();

        var course = new Course({
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

        var changed = course.addUnit({
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        });
      
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
        assert.equal(course.chapters[0].units[0].source, '/test.mp3');

        assert.equal(changed.id, course.id);
        assert.equal(changed.totalDuration, 120);
        assert.equal(changed.totalUnit, 1);

        var changedChapter = changed.chapter;
        assert.equal(changedChapter.totalDuration, 120);
        assert.equal(changedChapter.totalUnit, 1);

        var addedUnit = changed.chapter.unit;
        assert.isString(addedUnit.id);
        assert.equal(addedUnit.name, 'Unit 1');
        assert.equal(addedUnit.courseId, courseId);
        assert.equal(addedUnit.chapterId, chapterId);
        assert.equal(addedUnit.duration, 120);
        assert.equal(addedUnit.type, UnitType.AUDIO);
        assert.equal(addedUnit.source, '/test.mp3');
    })
})

describe('Add Unit to not exist Chapter', function() {
    it('add Unit and property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();

        var course = new Course({
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

        var changed = course.addUnit({
            chapterId: 'notexist_blahblah',
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        });

        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 1);
        assert.equal(course.totalDuration, 0);
        assert.equal(course.totalUnit, 0);
        assert.equal(course.state, 'UNPUBLISH');
        assert.equal(course.chapters[0].name, 'Chapter 1');
        assert.equal(course.chapters[0].courseId, courseId);
        assert.equal(course.chapters[0].id, chapterId);
        assert.equal(course.chapters[0].units.length, 0);

        assert.equal(changed, null);
    })
})

describe('Update exist Unit', function() {
    it('property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var persistObj = {
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
        }

        var course = new Course(persistObj);

        var updateUnit = {
            id: unitId1,
            chapterId: chapterId,
            name: 'Unit A',
            type: 'VIDEO',
            duration: 90,
            source: '/test.mp4'
        }

        var changed = course.updateUnit(updateUnit);

        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 2);
        assert.equal(course.totalDuration, 180);
        assert.equal(course.state, 'PUBLISHED');
        assert.isString(course.chapters[0].units[0].id);
        assert.equal(course.chapters[0].units[0].id, unitId1);
        assert.equal(course.chapters[0].units[0].name, 'Unit A');
        assert.equal(course.chapters[0].units[0].courseId, courseId);
        assert.equal(course.chapters[0].units[0].chapterId, chapterId);
        assert.equal(course.chapters[0].units[0].duration, 90);
        assert.equal(course.chapters[0].units[0].type, UnitType.VIDEO);
        assert.equal(course.chapters[0].units[0].source, '/test.mp4');

        assert.equal(changed.id, course.id);
        assert.equal(changed.totalDuration, 180);

        var changedChapter = changed.chapter;
        assert.equal(changedChapter.totalDuration, 90);

        var updatedUnit = changed.chapter.unit;
        assert.equal(updatedUnit.name, 'Unit A');
        assert.equal(updatedUnit.duration, 90);
        assert.equal(updatedUnit.type, UnitType.VIDEO);
        assert.equal(updatedUnit.source, '/test.mp4');
    })
})

describe('Update not exist Unit', function() {
    it('property changes correctly', function() {
        var authorId = shortid.generate();
        var categoryId = shortid.generate();
        var courseId = shortid.generate();
        var chapterId = shortid.generate();
        var chapterId1 = shortid.generate();
        var unitId1 = shortid.generate();
        var unitId2 = shortid.generate();

        var persistObj = {
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
        }

        var course = new Course(persistObj);

        var updateUnit = {
            id: 'notexist_aksdhfaljsdhf',
            chapterId: chapterId,
            name: 'Unit A',
            type: 'VIDEO',
            duration: 90,
            source: '/test.mp4'
        }

        var changed = course.updateUnit(updateUnit);

        assert.equal(course.title, 'Course Test');
        assert.equal(course.description, 'Mo ta');
        assert.equal(course.authorId, authorId);
        assert.equal(course.categoryId, categoryId);
        assert.equal(course.originPrice, 1000000);
        assert.equal(course.sellPrice, 500000);
        assert.equal(course.chapters.length, 2);
        assert.equal(course.totalDuration, 210);
        assert.equal(course.state, 'PUBLISHED');
        assert.isString(course.chapters[0].units[0].id);
        assert.equal(course.chapters[0].units[0].name, 'Unit 1');
        assert.equal(course.chapters[0].units[0].courseId, courseId);
        assert.equal(course.chapters[0].units[0].chapterId, chapterId);
        assert.equal(course.chapters[0].units[0].duration, 120);
        assert.equal(course.chapters[0].units[0].type, UnitType.AUDIO);
        assert.equal(course.chapters[0].units[0].source, '/test.mp3');

        assert.equal(changed, null);
    })
})

describe('Toggle Course State', function() {
    it('State property changes correctly', function() {
        var course = new Course({
            title: 'Course Test',
            description: 'Mo ta',
            authorId: shortid.generate(),
            categoryId: shortid.generate(),
            originPrice: 1000000,
            sellPrice: 500000
        });

        var changed = course.toggleState('PUBLISHED');
        assert.equal(course.state, 'PUBLISHED');
        assert.equal(changed.state, 'PUBLISHED');
        assert.equal(changed.id, course.id);

        changed = course.toggleState('UNPUBLISH');
        assert.equal(course.state, 'UNPUBLISH');
        assert.equal(changed.state, 'UNPUBLISH');
        assert.equal(changed.id, course.id);
    })
})