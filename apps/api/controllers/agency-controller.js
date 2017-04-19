var dependencies = {
    agencyRepository: null, 
    agencyWriteService: null
}

function AgencyController(agencyWriteService, agencyRepository) {
    dependencies.agencyRepository = agencyRepository;
    dependencies.agencyWriteService = agencyWriteService;
}

AgencyController.prototype.getAgency = function (req, res, next) {
    var agencyId = req.params.agencyId;
    var select = req.fields ? req.fields.split(" ") : [];

    dependencies.agencyRepository.findById(agencyId, select, function (err, agency) {
        if (err) {
            next(err);
        } else {
            res.agency = agency;
            next();
        }
    });
}

AgencyController.prototype.getAgencies = function (req, res, next) {
    var select = req.fields ? req.fields.split(" ") : [];
    var limit = req.options.limit;
    var page = req.options.skip;
    var condition = req.where;
    var orderBy = req.options.sort;

    dependencies.agencyRepository.findAll(condition, orderBy, select, page, limit, function (err, agencies) {
        if (err) {
            next(err);
        } else {
            res.agencies = agencies;
            next();
        }
    });
}

AgencyController.prototype.updateAgency = function (req, res, next) {
    var agencyId = req.params.agencyId;
    var agencyObj = req.body;
    agencyObj.id = agencyId;

    dependencies.agencyWriteService.update(agencyObj, function(err, success) {
        if(err) {
            next(err);
        } else {
            res.success = success;
            next();
        }
    });
}

AgencyController.prototype.createAgency = function (req, res, next) {
    var agencyObj = req.body;

    dependencies.agencyWriteService.create(agencyObj, function(err, agency) {
        if(err) {
            next(err);
        } else {
            res.agency = agency;
            next();
        }
    });
}

AgencyController.prototype.getService = function (req, res,next ) {
    var serviceId = req.params.serviceId;
    var agencyId = req.params.agencyId;

    var select = req.fields ? req.fields.split(" ") : [];

    dependencies.agencyRepository.findById(agencyId, [], function (err, result) {
        if (err) {
            next(err);
        } else {
            var service = result.services.find(function(s) { 
                return s.id == serviceId;
            });

            res.service = service;
            next();
        }
    });
}

AgencyController.prototype.addService = function (req, res,next ) {
    var service = req.body;

    var agencyId = req.params.agencyId;

    dependencies.agencyWriteService.addService(agencyId, service, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    });
}

AgencyController.prototype.updateService = function (req, res,next ) {
    var service = req.body;

    var agencyId = req.params.agencyId;
    var serviceId = req.params.serviceId;

    service.id = serviceId;

    dependencies.agencyWriteService.updateService(agencyId, service, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    });
}

AgencyController.prototype.deleteService = function (req, res,next ) {
    var serviceId = req.params.serviceId;

    var agencyId = req.params.agencyId;

    dependencies.agencyWriteService.deleteService(agencyId, serviceId, function (err, result) {
        if (err) {
            next(err);
        } else {
            res.result = result;
            next();
        }
    });
}

module.exports = AgencyController;