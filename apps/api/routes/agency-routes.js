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
            agencyResultMiddleWare.addService);
    app.route('/agencies/:agencyId/service/:serviceId')
        .get(agencyController.getService,
            agencyResultMiddleWare.getService)
        .put(agencyController.updateService,
            agencyResultMiddleWare.updateService)       
        .delete(agencyController.deleteService,
            agencyResultMiddleWare.deleteService);
}