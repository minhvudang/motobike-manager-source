var Category = require('../../domain-models/category');
var CategoryEvents = require('../../domain-models/events/category-events');

var options = {};

var CategoryViewGenerator = function(categoryRepository) {
    options.categoryRepository = categoryRepository;
}

CategoryViewGenerator.prototype.handler = function(message, callback) {
    switch(message.type) {
        case CategoryEvent.CATEGORY_CREATED:
            CategoryCreatedHandler(message.data, callback);
            break;
    }
}

function CategoryCreatedHandler(message, callback) {
    options.categoryRepository
        .save(message, function(err, result) {
            callback(err, result);
        })
}

module.exports = CategoryViewGenerator;