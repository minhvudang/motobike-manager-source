var agencyResultMiddleWare = require('../middlewares/agency-result');

module.exports = function(app, agencyController){
    app.route('/agencies')
        .get(agencyController.getAgencies, 
             agencyResultMiddleWare.getAgencies)
        .post(agencyController.createAgency, 
              agencyResultMiddleWare.createAgency);
    app.route('/agencies/:agencyId')
        .get(agencyController.getAgency,
            agencyResultMiddleWare.getAgency);
    app.route('/agencies/:agencyId/service')
        .post(agencyController.addService,
            agencyResultMiddleWare.addService)
        .put(agencyController.updateService,
            agencyResultMiddleWare.updateService)
        .delete(agencyController.deleteService,
            agencyResultMiddleWare.deleteService);
}