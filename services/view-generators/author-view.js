var Author = require('../../domain-models/author');
var AuthorEvents = require('../../domain-models/events/author-events');

var options = {};

var AuthorViewGenerator = function(authorRepository) {
    options.authorRepository = authorRepository;
}

AuthorViewGenerator.prototype.handler = function(message, callback) {
    switch(message.type) {
        case AuthorEvents.AUTHOR_CREATED:
            AuthorCreatedHandler(message.data, callback);
            break;
        case AuthorEvents.AUTHOR_UPDATED:
            AuthorUpdatedHandler(message.data, callback);
            break;
    }
}

function AuthorCreatedHandler(message, callback) {
    options.authorRepository
        .save(message, function(err, result) {
            callback(err, result);
        })
}

function AuthorUpdatedHandler(message, callback) {
    options.authorRepository
        .update(message.id, message, function(err, result) {
            callback(err, result);
        })
}

module.exports = AuthorViewGenerator;