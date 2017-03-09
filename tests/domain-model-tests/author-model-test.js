var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');

var Author = require('../../domain-models/author');

describe('Create new Author', function() {
    it('must return new Author with random id and correct property', function () {
        try {
            assert.throws(new Author({
                //no name, no title
                title: 'CEO Stark Industry',
                avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
            }))
        } catch(Error) {
            var invalidProps = ['name', 'description'];
            var validProps = ['title', 'avatar'];

            Error.forEach(function(e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 2);
        }

        var author = new Author({
            name: 'Tony Stark',
            title: 'CEO Stark Industry',
            description: 'Billionaire, Genius, Philanthropist',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        })

        assert.isString(author.id);
        assert.equal(author.name, 'Tony Stark');
        assert.equal(author.title, 'CEO Stark Industry');
        assert.equal(author.description, 'Billionaire, Genius, Philanthropist');
        assert.equal(author.avatar, 'http://wallpapercave.com/wp/0PULYfE.jpg');
    })
})

describe('Serialize Author from Object', function() {
    it('must return Author equal Object', function() {
        var authorId = shortid.generate();
        var author = new Author({
            id: authorId,
            name: 'Tony Stark',
            title: 'CEO Stark Industry',
            description: 'Billionaire, Genius, Philanthropist',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        });

        assert.isString(author.id);
        assert.equal(author.id, authorId);
        assert.equal(author.name, 'Tony Stark');
        assert.equal(author.title, 'CEO Stark Industry');
        assert.equal(author.description, 'Billionaire, Genius, Philanthropist');
        assert.equal(author.avatar, 'http://wallpapercave.com/wp/0PULYfE.jpg');
    })
})

describe('Update Author', function() {
    it('property changes correctly', function() {
        var author = new Author({
            name: 'Tony Stark',
            title: 'CEO Stark Industry',
            description: 'Billionaire, Genius, Philanthropist',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        })

        var newId = author.id;

        var updatedAuthor = author.update({
            name: 'Tony Stark',
            title: 'CEO Stark Industry',
            description: 'Billionaire, Genius, Philanthropist',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        });

        assert.deepEqual(updatedAuthor, {id: author.id});

        updatedAuthor = author.update({
            name: 'Iron Man'
        });

        assert.isString(author.id);
        assert.equal(author.name, 'Iron Man');
        assert.equal(author.title, 'CEO Stark Industry');
        assert.equal(author.description, 'Billionaire, Genius, Philanthropist');
        assert.equal(author.avatar, 'http://wallpapercave.com/wp/0PULYfE.jpg');

        assert.equal(updatedAuthor.id, author.id);
        assert.equal(updatedAuthor.title, undefined);
        assert.equal(updatedAuthor.description, undefined);
        assert.equal(updatedAuthor.avatar, undefined);
        assert.equal(updatedAuthor.name, 'Iron Man');

        updatedAuthor = author.update({
            id: 'abcdf',
            name: 'Peter Parker',
            title: 'Spiderman',
            description: 'blah blah blah blah blah blah',
            avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
        });

        assert.isString(author.id);
        assert.isString(author.id, newId);
        assert.equal(author.name, 'Peter Parker');
        assert.equal(author.title, 'Spiderman');
        assert.equal(author.description, 'blah blah blah blah blah blah');
        assert.equal(author.avatar, 'http://wallpapercave.com/wp/0PULYfE.jpg');

        assert.equal(updatedAuthor.name, 'Peter Parker');
        assert.equal(updatedAuthor.title, 'Spiderman');
        assert.equal(updatedAuthor.description, 'blah blah blah blah blah blah');
        assert.equal(updatedAuthor.avatar, undefined);
        assert.equal(updatedAuthor.id, author.id);

        try {
            assert.throws(author.update({
                id: 'abcdf',
                name: '',
                title: '', //empty
                description: 'toshort',
                avatar: 'http://wallpapercave.com/wp/0PULYfE.jpg'
            }))
        } catch(Error) {
            var invalidProps = ['name', 'title', 'description'];
            var validProps = ['avatar'];

            Error.forEach(function(e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 3);
        }
    })
})