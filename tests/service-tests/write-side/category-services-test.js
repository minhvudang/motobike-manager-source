var chai = require('chai');
var assert = chai.assert;

var CategoryService = require('../../../services/write-services/category-services');

var mockMessageBus = {
    send: function(payload, callback) {
        callback(null, payload);
    },
    publish: function(payload, callback){
        callback(null, payload);
    }
}

describe('Create new Category', function() {
    it('persist success and correctly', function() {
        var mockBlobStorage = {
            save: function(model, category, callback) {
                callback(null, category);
            }
        };

        var categoryService = new CategoryService(mockBlobStorage, mockMessageBus);

        categoryService.create({
            name: 'Chapter 1'
        }, function(err, category) {
            assert.isString(category.id);
            assert.equal(category.name, 'Chapter 1');
        });
    })
})

describe('Create duplicate Category', function() {
    it('raise error', function() {
        var mockBlobStorage = {
            save: function(model, category, callback) {
                var err = 'Duplicate men';
                callback(err, null);
            }
        };

        var categoryService = new CategoryService(mockBlobStorage, mockMessageBus);


        categoryService.create({
            name: 'Chapter 1'
        }, function(err, category) {
            assert.equal(err, 'Duplicate men');
            assert.equal(category, undefined);
        });
    })
})