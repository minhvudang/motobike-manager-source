var Agency = require('../domain-models/model/agency');

var AgencyService = function (agencyRepository) {
    this.agencyRepository = agencyRepository;
}

AgencyService.prototype.create = function (agencyProps, callback) {
    var self = this;
    var agencyInstance = null;

    try {
        agencyInstance = new Agency(agencyProps);
    } catch (err) {
        return callback({
            type: 'Bad Request',
            err: err
        });
    };

    self.agencyRepository.save(agencyInstance, function (err, agency) {
        if (err) return callback(err);
    
        return callback(null, agencyInstance);
    });
}

AgencyService.prototype.update = function (agencyProps, callback) {
    var self = this;
    var agencyObj = null;
    var agencyInstance = null;
    var changedPropsObj = null;

    self.agencyRepository.findById(agencyProps.id, function (err, agencyObj) {
        if (err) return callback(err);
        else if (!agencyObj) return callback({
            type: 'Not Found'
        });

        try {
            agencyInstance = new Agency(agencyObj);
            changedPropsObj = agencyInstance.update(agencyProps);
        } catch (err) {
            return callback({
                type: 'Bad Request',
                err: err
            });
        };

        self.agencyRepository.update(agencyInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })

            return callback(null, agencyInstance);
        });
    });
}

AgencyService.prototype.addService = function (agencyId ,serviceProps, callback) {
    var self = this;

    var agencyObj = null;
    var agencyInstance = null;
    var changedPropsObj = null;

    self.agencyRepository.findById(agencyId, null , function (err, agencyObj) {
        if (err) return callback(err);
        else if (!agencyObj) return callback(null, null);

        try {
            agencyInstance = new Course(agencyObj);
            changedPropsObj = agencyInstance.addService(serviceProps);
        } catch (err) {
            return callback(err);
        };

        self.agencyRepository.update(courseInstance.id , courseInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })
            return callback(null, changedPropsObj);
        });
    });
}

AgencyService.prototype.updateService = function (agencyId, serviceProps, callback) {
    var self = this;

    var agencyObj = null;
    var agencyInstance = null;
    var changedPropsObj = null;

    self.agencyRepository.find(agencyId, null, function (err, agencyObj) {
        if (err) return callback(err);
        else if (!courseObj) return callback(null, null);

        try {
            agencyInstance = new Course(agencyObj);
            changedPropsObj = agencyInstance.updateChapter(serviceProps);
        } catch (err) {
            return callback(err);
        };

        if (!changedPropsObj) return callback({
            type: 'Request Failed'
        })

        self.agencyRepository.update(agencyInstance.id, agencyInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })

            return callback(null, changedPropsObj);
        });
    });
}

AgencyService.prototype.deleteService = function (agencyId, serviceProps, callback) {
    var self = this;

    var agencyObj = null;
    var agencyInstance = null;
    var changedPropsObj = null;

    self.agencyRepository.find(agencyId, null, function (err, agencyObj) {
        if (err) return callback(err);
        else if (!courseObj) return callback(null, null);

        try {
            agencyInstance = new Course(agencyObj);
            changedPropsObj = agencyInstance.deleteService(serviceProps);
        } catch (err) {
            return callback(err);
        };

        if (!changedPropsObj) return callback({
            type: 'Request Failed'
        })

        self.agencyRepository.update(agencyInstance.id, agencyInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })

            return callback(null, changedPropsObj);
        });
    });
}

module.exports = AgencyService;