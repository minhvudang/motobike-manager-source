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
            if(result&&result.services) {
                result.services = JSON.parse(result.services);
            }
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

AgencyRepository.prototype.findAll = function(condition, orderBy, select, page, limit, callback) {
    this.Agency
        .findAll({
            attributes: select.length ? select : {exclude: ['services']},
            where: {
                name: {
                    $like: "%"+condition.name+"%"
                }
            },
            order: orderBy ? orderBy : null,
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
        .create(objectAssign(
            {},
            agencyObj,
            { services: JSON.stringify(agencyObj.services) }
        ))
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

AgencyRepository.prototype.update = function(agencyObj, callback) {
    this.Agency
        .update(objectAssign(
            {},
            agencyObj,
            { services: JSON.stringify(agencyObj.services) }
        ), { 
            where: { 'id': agencyObj.id } 
        })
        .then(function(result) {
                callback(null, true);
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
