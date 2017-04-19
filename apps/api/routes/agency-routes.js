var agencyResultMiddleWare = require('../middlewares/agency-result');

module.exports = function(app, agencyController){
    app.route('/agencies')
        .get(agencyController.getAgencies, 
             agencyResultMiddleWare.getAgencies)
        .post(agencyController.createAgency, 
              agencyResultMiddleWare.createAgency);
    app.route('/agencies/:agencyId')
        .get(agencyController.getAgency,
            agencyResultMiddleWare.getAgency)
        .put(agencyController.updateAgency,
            agencyResultMiddleWare.updateAgency);
    app.route('/agencies/:agencyId/service')
        .post(agencyController.addService,
            agencyResultMiddleWare.addService)
        .put(agencyController.updateService,
            agencyResultMiddleWare.updateService);
    app.route('/agencies/:agencyId/service/:serviceId')        
        .delete(agencyController.deleteService,
            agencyResultMiddleWare.deleteService);
}