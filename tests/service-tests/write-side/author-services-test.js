var chai = require('chai');
var assert = chai.assert;

var AuthorService = require('../../../services/write-services/author-services');

var mockMessageBus = {
    send: function(payload, callback) {
        callback(null, payload);
    },
    publish: function(payload, callback){
        callback(null, payload);
    }
}

describe('Create new Author', function() {
    it('persist success and correctly', function() {
        var mockBlobStorage = {
            save: function(model, author, callback) {
                callback(null, author);
            }
        };

        var authorService = new AuthorService(mockBlobStorage, mockMessageBus);
        
        authorService.create({
            name: 'Phạm Thành Long',
            title: 'Thánh chém gió',
            description: 'Bậc thầy, chuyên gia về chém gió. Trại chủ trại Đại bàng',
            avatar: '/test.jpg'
        }, function(err, author) {
            assert.isString(author.id);
            assert.equal(author.name, 'Phạm Thành Long');
            assert.equal(author.title, 'Thánh chém gió');
            assert.equal(author.description, 'Bậc thầy, chuyên gia về chém gió. Trại chủ trại Đại bàng');
            assert.equal(author.avatar, '/test.jpg');
        });

        authorService.create({
            name: '',
            title: 'Th',
            description: 'Bậc thầy, chuyên gia về chém gió. Trại chủ trại Đại bàng',
            avatar: '/test.jpg'
        }, function(err, author) {
            assert.equal(err.err.length, 2);
        });
    })
})

describe('Create duplicate Author', function() {
    it('raise error', function() {
        var mockBlobStorage = {
            save: function(model, author, callback) {
                var err = 'Duplicate men';
                callback(err, null);
            }
        };

        var authorService = new AuthorService(mockBlobStorage, mockMessageBus);
        
        authorService.create({
            name: 'Phạm Thành Long',
            title: 'Thánh chém gió',
            description: 'Bậc thầy, chuyên gia về chém gió. Trại chủ trại Đại bàng',
            avatar: '/test.jpg'
        }, function(err, author) {
            assert.equal(err, 'Duplicate men');
            assert.equal(author, undefined);
        });
    })
})

describe('Update exist Author', function() {
    it('update success and correctly', function() {
        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, {
                    id: 'adcQ34',
                    name: 'Phạm Thành Long',
                    title: 'Thánh chém gió',
                    description: 'Bậc thầy, chuyên gia về chém gió. Trại chủ trại Đại bàng',
                    avatar: '/test.jpg'
                })
            },
            update: function(model, author, callback) {
                callback(null, author);
            }
        };

        var authorService = new AuthorService(mockBlobStorage, mockMessageBus);

        authorService.update({
            id: 'adcQ34',
            title: 'Sửa thì vẫn lỗi thôi',
            description: 'Once a "trại chủ" always a "trại chủ"'
        }, function(err, result) {
            assert.equal(result.title, 'Sửa thì vẫn lỗi thôi');
            assert.equal(result.description, 'Once a "trại chủ" always a "trại chủ"');
        });
    })
})

describe('Update not exist Author', function() {
    it('raise warning', function() {
        var mockBlobStorage = {
            find: function(model, id, callback) {
                callback(null, null);
            },
            update: function(model, author, callback) {
                callback(null, false);
            }
        };

        var authorService = new AuthorService(mockBlobStorage, mockMessageBus);

        authorService.update({
            id: 'adcQ34',
            title: 'Sửa thì vẫn là chém gió thôi :v',
            description: 'Once a "trại chủ" always a "trại chủ"'
        }, function(err, result) {
            assert.equal(result, null);
        });
    })
})