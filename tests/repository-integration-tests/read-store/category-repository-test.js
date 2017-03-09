var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');
var config = require('../../../config/config');

var DataContext = require('../../../repository/read-store/data-context');
var CategoryRepository = require('../../../repository/read-store/category-repository');

var dataContext = DataContext(config.readStore);
var categoryRepository = new CategoryRepository(dataContext);

describe('Save new Category', function() {
    it('must persist success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var categoryId = shortid.generate();
            var categoryObj = {
                id: categoryId,
                name: 'Làm giàu đéo khó'
            };

            categoryRepository.save(categoryObj, function(err, category) {
                assert.equal(category.id, categoryId);
                assert.equal(category.name, categoryObj.name);

                done();
            });
        })
    })
})

describe('Save duplicate Category', function() {
    it('raise error', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var categoryId = shortid.generate();
            var categoryObj = {
                id: categoryId,
                name: 'Làm giàu đéo khó'
            };

            categoryRepository.save(categoryObj, function(err, category) {
                categoryRepository.save(categoryObj, function(err, category) {
                    assert.isObject(err);

                    done();
                })
            });
        })
    })
})

describe('Get exist Category by Id', function() {
    it('must get correct data', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var categoryId = shortid.generate();
            var categoryObj = {
                id: categoryId,
                name: 'Làm giàu đéo khó'
            };

            categoryRepository.save(categoryObj, function(err, category) {
                categoryRepository.findById(categoryId, function(err, category) {
                    assert.equal(category.id, categoryId);
                    assert.equal(category.name, categoryObj.name);

                    done();
                });
            });
        })
    })
})

describe('Get not exist Category by Id', function() {
    it('get nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            categoryRepository.findById('NotExist_121234', function(err, category) {
                assert.equal(category, null);

                done();
            })
        })
    })
})

describe('Get all Category', function() {
    it('get all Category correct', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var categoryId1 = shortid.generate();
            var categoryId2 = shortid.generate();
            var categoryObj = {
                id: categoryId1,
                name: 'Làm giàu đéo khó 1'
            };

            categoryRepository.save(categoryObj, function(err, category) {
                categoryId = shortid.generate();
                categoryObj = {
                    id: categoryId2,
                    name: 'Làm giàu đéo khó 2'
                };
                categoryRepository.save(categoryObj, function(err, category) {
                    categoryRepository.findAll(function(err, categories) {
                        assert.isAtLeast(categories.length ,2);
                        
                        categories.forEach(function(category) {
                            if(category.id == categoryId1) {
                                assert.equal(category.name, 'Làm giàu đéo khó 1');
                            } else if(category.id == categoryId2) {
                                assert.equal(category.name, 'Làm giàu đéo khó 2');
                            }
                        })

                        done();
                    });
                })
            });
        })
    })
})