var Author = require('../../domain-models/author');
var AuthorEvent = require('../../domain-models/events/author-events');

var AuthorService = function (blobStorage, messageProducer) {
    this.blobStorage = blobStorage;
    this.messageProducer = messageProducer;
}

AuthorService.prototype.create = function (authorProps, callback) {
    var self = this;
    var authorInstance = null;

    try {
        authorInstance = new Author(authorProps);
    } catch (err) {
        return callback({
            type: 'Bad Request',
            err: err
        });
    };

    self.blobStorage.save("Author", authorInstance, function (err, author) {
        if (err) return callback(err);
        var publishObj = {
            type: AuthorEvent.AUTHOR_CREATED,
            data: authorInstance
        };

        self.messageProducer.publish(publishObj, function (err, result) {
            //do something after publish
        });

        return callback(null, authorInstance);
    });
}

AuthorService.prototype.update = function (authorProps, callback) {
    var self = this;
    var authorObj = null;
    var authorInstance = null;
    var changedPropsObj = null;

    self.blobStorage.find("Author", authorProps.id, function (err, authorObj) {
        if (err) return callback(err);
        else if (!authorObj) return callback({
            type: 'Not Found'
        });

        try {
            authorInstance = new Author(authorObj);
            changedPropsObj = authorInstance.update(authorProps);
        } catch (err) {
            return callback({
                type: 'Bad Request',
                err: err
            });
        };

        self.blobStorage.update("Author", authorInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })

            var publishObj = {
                type: AuthorEvent.AUTHOR_UPDATED,
                data: changedPropsObj
            };

            self.messageProducer.publish(publishObj, function (err, result) {
                //do something after publish
            });

            return callback(null, authorInstance);
        });
    });
}

module.exports = AuthorService;