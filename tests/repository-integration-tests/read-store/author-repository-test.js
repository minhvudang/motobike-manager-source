var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');
var config = require('../../../config/config');

var DataContext = require('../../../repository/read-store/data-context');
var AuthorRepository = require('../../../repository/read-store/author-repository');

var dataContext = DataContext(config.readStore);
var authorRepository = new AuthorRepository(dataContext);

describe('Save new Author', function() {
    it('must persist success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var authorObj = {
                id: authorId,
                name: 'Peter Parker',
                title: 'Spiderman',
                description: 'blah blah blah'
            };

            authorRepository.save(authorObj, function(err, author) {
                assert.equal(author.id, authorId);
                assert.equal(author.name, authorObj.name);
                assert.equal(author.title, authorObj.title);
                assert.equal(author.description, authorObj.description);

                done();
            });
        })
    })
})

describe('Save duplicate Author', function() {
    it('raise error', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var authorObj = {
                id: authorId,
                name: 'Peter Parker',
                title: 'Spiderman',
                description: 'blah blah blah'
            };

            authorRepository.save(authorObj, function(err, author) {
                authorRepository.save(authorObj, function(err, author) {
                    assert.isObject(err)

                    done();
                });
            });
        })
    })
})

describe('Get exist Author by Id', function() {
    it('must get correct data', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var authorObj = {
                id: authorId,
                name: 'Peter Parker',
                title: 'Spiderman',
                description: 'blah blah blah'
            };

            authorRepository.save(authorObj, function(err, result) {
                authorRepository.findById(authorId, [], function(err, author) {
                    assert.equal(author.id, authorId);
                    assert.equal(author.name, authorObj.name);
                    assert.equal(author.title, authorObj.title);
                    assert.equal(author.description, authorObj.description);
                    authorRepository.findById(authorId, ['id', 'name'], function(err, author) {
                        assert.equal(author.id, authorId);
                        assert.equal(author.name, authorObj.name);
                        assert.equal(author.title, undefined);
                        assert.equal(author.description, undefined);

                        done();
                    });
                });
            });
        })
    })
})

describe('Get not exist Author by Id', function(done) {
    it('get nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            authorRepository.findById('NotExist_121234', [], function(err, author) {
                assert.equal(author, null);
                done();
            })
        })
    })
})

describe('Get list Author with paging', function() {
    it('get list Author correct', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            authorRepository.findAll([], 0, 2, function(err, authors) {
                assert.equal(authors.length, 2);
                
                authorRepository.findAll([], 1, 2, function(err, authors) {
                    assert.isAtLeast(authors.length, 2)
                    done();
                })
            })
        })
    })
})

describe('Update exist Author', function() {
    it('update success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var authorObj = {
                id: authorId,
                name: 'Peter Parker',
                title: 'Spiderman',
                description: 'blah blah blah'
            };

            authorRepository.save(authorObj, function(err, result) {
                authorRepository.update(authorId, {
                    name: 'Tony Stark',
                    title: 'CEO'
                }, function(err, result) {
                    assert.equal(result, true);

                    authorRepository.findById(authorId, [], function(err, author) {
                        assert.equal(author.id, authorId);
                        assert.equal(author.name, 'Tony Stark');
                        assert.equal(author.title, 'CEO');
                        assert.equal(author.description, authorObj.description);

                        done();
                    });
                })
            });
        })
    })
})

describe('Update not exist Author', function() {
    it('do nothing', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var authorId = shortid.generate();
            var authorObj = {
                id: authorId,
                name: 'Peter Parker',
                title: 'Spiderman',
                description: 'blah blah blah'
            };

            authorRepository.save(authorObj, function(err, result) {
                authorRepository.update('NotExist_121234', {
                    name: 'Tony Stark',
                    title: 'CEO'
                }, function(err, result) {
                    assert.equal(result, false);
                    done();
                })
            });
        })
    })
})