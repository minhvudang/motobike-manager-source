var objectAssign = require('object-assign');

var AgencyRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.Agency = dbContext.Agency;
}

AgencyRepository.prototype.findById = function(id, select, callback) {
    this.Agency
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

AgencyRepository.prototype.findAll = function(select, page, limit, callback) {
    this.Agency
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

AgencyRepository.prototype.save = function(agencyObj, callback) {
    this.Agency
        .create(agencyObj)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

AgencyRepository.prototype.update = function(id, agencyObj, callback) {
    this.Agency
        .update(agencyObj, { 
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

AgencyRepository.prototype.delete = function(condition, callback) {
    this.Agency
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

module.exports = AgencyRepository;
