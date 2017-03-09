var chai = require('chai');
var assert = chai.assert;
var objectAssign = require('object-assign');

var shortid = require('shortid');
var config = require('../../../config/config');

var DataContext = require('../../../repository/read-store/data-context');
var CourseRepository = require('../../../repository/read-store/course-repository');

var dataContext = DataContext(config.readStore);
var courseRepository = new CourseRepository(dataContext);

describe('Save new Course', function() {
    it('must persist success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();

            var expectResult = objectAssign(
                {},
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                assert.equal(result.id, expectResult.id);
                assert.equal(result.title, expectResult.title);
                assert.equal(result.description, expectResult.description)
                assert.equal(result.categoryId, expectResult.categoryId);
                assert.equal(result.categoryName, expectResult.categoryName);
                assert.equal(result.originPrice, expectResult.originPrice);
                assert.equal(result.sellPrice, expectResult.sellPrice);
                assert.equal(result.chapters, expectResult.chapters)
                assert.equal(result.authorId, expectResult.authorId);
                assert.equal(result.authorName, expectResult.authorName);
                assert.equal(result.totalRating, 0);
                assert.equal(result.viewNumber, 0);
                assert.equal(result.buyNumber, 0);
                assert.equal(result.totalReview, 0);
                
                done();
            })
        })
    })
})

describe('Save duplicate Course', function() {
    it('raise error', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();

            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
               courseRepository.save(courseObj, function(err, result) {

                    assert.isObject(err);
                    
                    done();
               })
            })
        })
    })
})

describe('Get exist Course by Id', function() {
    it('must get correct data', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();
            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.findById(courseObj.id, [], function(err, result) {
                    assert.equal(result.id, expectResult.id);
                    assert.equal(result.title, expectResult.title);
                    assert.equal(result.description, expectResult.description)
                    assert.equal(result.categoryId, expectResult.categoryId);
                    assert.equal(result.categoryName, expectResult.categoryName);
                    assert.equal(result.originPrice, expectResult.originPrice);
                    assert.equal(result.sellPrice, expectResult.sellPrice);
                    assert.equal(result.chapters, expectResult.chapters)
                    assert.equal(result.authorId, expectResult.authorId);
                    assert.equal(result.authorName, expectResult.authorName);
                    assert.equal(result.totalRating, 0);
                    assert.equal(result.viewNumber, 0);
                    assert.equal(result.buyNumber, 0);
                    assert.equal(result.totalReview, 0);
                    
                    done();
                })
            })
        })
    })
})

describe('Get not exist Course by Id', function(done) {
    it('get nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();
            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.findById('notexist_asjdfhasdf', [], function(err, result) {
                    assert.equal(err, null);
                    assert.equal(result, null);
                    
                    done();
                })
            })
        })
    })
})

describe('Get list Course', function() {
    it('with no condition and order by createdAt then must get correct data', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();
            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) } 
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.findAll({}, [['createdAt', 'DESC']], [], 0, 2 , function(err, courses) {
                    assert.isAtLeast(courses.length, 1);
                    assert.isAtLeast(courses[0].createdAt, courses[1].createdAt);
                    done();
                })
            });
        })
    })
})

describe('Get list Course', function() {
    it('with no condition and order by sellPrice then must get correct data', function(done) {
        this.timeout(120000);
        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse(200000);
            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.findAll({}, [['sellPrice', 'ASC']], [], 0, 2 , function(err, courses) {
                    assert.isAtLeast(courses.length, 1);
                    assert.isAtLeast(courses[1].sellPrice, courses[0].sellPrice);
                    done();
                })
            });
        })
    })
});

describe('Get list Course', function() {
    it('with categoryId condition then must get correct data', function(done) {
        this.timeout(120000);
        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();
            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.findAll({ 
                    categoryId: courseObj.categoryId 
                }, [], [], 0, 2 , function(err, courses) {
                    assert.isAtLeast(courses.length, 1);
                    assert.equal(courses[0].categoryId, courseObj.categoryId);

                    done();
                });
            });
        })
    })
})

describe('Update exist Course', function() {
    it('update success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();

            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.update({
                    id: courseObj.id,
                    categoryId: 'jdshfafd',
                    description: 'Another one bite the dust',
                    categoryName: 'Blah blah',
                    sellPrice: 200000,
                    totalRated: 10
                }, function(err, result) {
                     assert.equal(result, true);

                     courseRepository.findById(courseObj.id, [], function(err, result) {
                        assert.equal(result.id, expectResult.id);
                        assert.equal(result.title, expectResult.title);
                        assert.equal(result.description, 'Another one bite the dust')
                        assert.equal(result.categoryId, 'jdshfafd');
                        assert.equal(result.categoryName, 'Blah blah');
                        assert.equal(result.originPrice, expectResult.originPrice);
                        assert.equal(result.sellPrice, 200000);
                        assert.equal(result.chapters, expectResult.chapters)
                        assert.equal(result.authorId, expectResult.authorId);
                        assert.equal(result.authorName, expectResult.authorName);
                        assert.equal(result.totalRating, 0);
                        assert.equal(result.viewNumber, 0);
                        assert.equal(result.buyNumber, 0);
                        assert.equal(result.totalReview, 0);
                        
                        done();
                    })
                })
            })
        })
    })
})

describe('Update not exist Course', function() {
    it('do nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var courseObj = generateCourse();

            var expectResult = objectAssign(
                {}, 
                courseObj, 
                { chapters: JSON.stringify(courseObj.chapters) }
            )

            courseRepository.save(courseObj, function(err, result) {
                courseRepository.update({
                    id: 'notexist_blahblah',
                    categoryId: 'jdshfafd',
                    description: 'Another one bite the dust',
                    categoryName: 'Blah blah',
                    sellPrice: 200000,
                    totalRated: 10
                }, function(err, result) {
                     assert.equal(result, false);
                     done();
                })
            })
        })
    })
})

function generateCourse(sellPrice) {
    var authorId1 = shortid.generate();
    var authorId2 = shortid.generate();
    var categoryId = shortid.generate();
    
    if(!sellPrice) sellPrice = 500000;
    
    var course = {
        id: shortid.generate(),
        title: 'Course Test',
        description: 'Mo ta',
        state: 'test',
        authorId: authorId1,
        categoryId: categoryId,
        originPrice: 1000000,
        sellPrice: sellPrice,
        totalDuration: 0,
        totalUnit: 0,
        chapters: [{ 
            id: shortid.generate(),
            name: 'Chapter 1',
            units: [{
                id: shortid.generate(),
                name: 'Unit 1',
                duration: 120,
                source: '/test.mp3'
            }]
        }]
    };

    return objectAssign({}, course, { categoryName: 'Test' }, { authorName: 'Author 1' });
}