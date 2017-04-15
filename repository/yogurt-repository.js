var objectAssign = require('object-assign');

var YogurtRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Yogurt = dbContext.Yogurt;
}

YogurtRepository.prototype.findById = function(id, select, callback) {
    this.Yogurt
        .findOne({
            attributes: select.length ? select : null,
            where: { 'id': id }
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

YogurtRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Yogurt
        .findAll({
            attributes: select.length ? select : null,
            limit: limit,
            offset: page * limit
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

YogurtRepository.prototype.save = function(yogurtObj, callback) {
    this.Yogurt
        .create(yogurtObj)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = YogurtRepository;
