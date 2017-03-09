var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');

var Category = require('../../domain-models/category');

describe('Create new Category', function() {
    it('must return new Category with random id and correct property', function () {
        var category = new Category({
            name: 'Chapter 1'
        })

        assert.isString(category.id);
        assert.equal(category.name, 'Chapter 1');

        try {
            assert.throws(new Category({
                name: 's'
            }))
        } catch(Error) {
            assert.equal(Error[0].parameter, 'name');
            assert.equal(Error.length, 1);
        }
    })
})

describe('Serialize Category from Object', function() {
    it('must return Category equal Object', function() {
        var categoryId = shortid.generate();
        var category = new Category({
            id: categoryId,
            name: 'Chapter 1'
        })

        assert.isString(category.id);
        assert.equal(category.id, categoryId);
        assert.equal(category.name, 'Chapter 1');
    })
})