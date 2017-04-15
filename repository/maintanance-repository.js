var objectAssign = require('object-assign');

var MaintainanceRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Maintainance = dbContext.Maintainance;
}

MaintainanceRepository.prototype.findById = function(id, select, callback) {
    this.Maintainance
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

MaintainanceRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Maintainance
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

MaintainanceRepository.prototype.save = function(maintainanceObj, callback) {
    this.Maintainance
        .create(maintainanceObj)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = MaintainanceRepository;
