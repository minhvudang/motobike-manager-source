var objectAssign = require('object-assign');

var ServiceRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Service = dbContext.Service;
}

ServiceRepository.prototype.findById = function(id, select, callback) {
    this.Service
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

ServiceRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Service
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

ServiceRepository.prototype.save = function(serviceObj, callback) {
    this.Service
        .create(serviceObj)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

ServiceRepository.prototype.delete = function(condition, callback) {
    this.Service
        .destroy({
            where: condition ? condition : null
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

ServiceRepository.prototype.update = function(id, serviceObj, callback) {
    this.Service
        .update(serviceObj, { 
            where: { 'id': id } 
        })
        .then(function(result) {
            if(result.every(function(val){
                return val == 1;
            })){
                callback(null, true);
            }else{
                callback(null, false);
            }
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = ServiceRepository;
