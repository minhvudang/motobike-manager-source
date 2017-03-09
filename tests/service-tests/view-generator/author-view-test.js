var chai = require('chai');
var assert = chai.assert;

var Author = require('../../../domain-models/author')
var AuthorEvents = require('../../../domain-models/events/author-events');
;

var config = require('../../../config/config');
var AuthorViewGenerator = require('../../../services/view-generators/author-view');
var DataContext = require('../../../repository/read-store/data-context');
var AuthorRepository = require('../../../repository/read-store/author-repository');

var dataContext = DataContext(config.readStore);
var authorRepository = new AuthorRepository(dataContext);
var authorViewGenerator = new AuthorViewGenerator(authorRepository);

describe('Create new Author', function(){
    it('persist success and correctly', function(done) {
        this.timeout(12000);

        var author = new Author({
            name: 'Tony Stark',
            title: 'CEO Stark Industry',
            description: 'Billionaire, Genius, Philanthropist',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        });

        var authorCreatedEvent = {
            type: AuthorEvents.AUTHOR_CREATED,
            data: author
        }

        dataContext.sequelize.sync().then(function() {
            authorViewGenerator.handler(authorCreatedEvent, function(err, result) {
                authorRepository.findById(author.id, [], function(err, result) {
                    assert.equal(result.id, author.id);
                    assert.equal(result.name, author.name);
                    assert.equal(result.title, author.title);
                    assert.equal(result.description, author.description);
                    // assert.equal(result.avatar, author.avatar);

                    done();
                })
            })
        })
    })
})

describe('Update exist Author', function(){
    it('update success and correctly', function(done) {
        this.timeout(12000);

        var author = new Author({
            name: 'Tony Stark',
            title: 'CEO Stark Industry',
            description: 'Billionaire, Genius, Philanthropist',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        });

        var authorCreatedEvent = {
            type: AuthorEvents.AUTHOR_CREATED,
            data: author
        }

        dataContext.sequelize.sync().then(function() {
            authorViewGenerator.handler(authorCreatedEvent, function(err, result) {
                var dataChanged = author.update({
                    name: 'Iron Man'
                });

                var authorUpdatedEvent = {
                    type: AuthorEvents.AUTHOR_UPDATED,
                    data: dataChanged
                }

                authorViewGenerator.handler(authorUpdatedEvent, function(err, result) {
                    authorRepository.findById(author.id, [], function(err, result) {
                        assert.equal(result.id, author.id);
                        assert.equal(result.name, 'Iron Man');
                        assert.equal(result.title, author.title);
                        assert.equal(result.description, author.description);
                        // assert.equal(result.avatar, author.avatar);

                        done();
                    })
                })
            })
        })
    })
})