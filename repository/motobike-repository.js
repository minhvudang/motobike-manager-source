var objectAssign = require('object-assign');

var MotobikeRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Motobike = dbContext.Motobike;
}

MotobikeRepository.prototype.findById = function(id, select, callback) {
    this.Motobike
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

MotobikeRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Motobike
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

MotobikeRepository.prototype.save = function(motobikeObj, callback) {
    this.Motobike
        .create(objectAssign(
            {},
            motobikeObj,
            {owner: JSON.stringify(owner)}
        ))
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = MotobikeRepository;
