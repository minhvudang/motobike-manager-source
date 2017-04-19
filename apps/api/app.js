process.env.NODE_ENV = 'local';

var express = require('express');
var queryHandler = require('express-api-queryhandler');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('../../config/config');
var compress = require('compression');

/* ===== Express setup ===== */

var app  = express();
app.use(queryHandler.fields());
app.use(queryHandler.filter());
app.use(queryHandler.pagination({limit: 100}));
app.use(queryHandler.sort());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compress());
app.use(cors());

/* ===== End  ===== */

/* ===== Read-side Components setup ===== */

//Datacontext
var readDataContext = require('../../repository/data-context')(config.readStore);

//Read Repository
var AgencyRepository = require('../../repository/agency-repository');
var UserRepository = require('../../repository/user-repository');

var agencyRepository = new AgencyRepository(readDataContext);
var userRepository = new UserRepository(readDataContext);

/* ===== End  ===== */

/* ===== Write-side Components setup ===== */

//Write Service
var AgencyService = require('../../services/agency-services');
var UserService = require('../../services/user-services');

var agencyWriteService = new AgencyService(agencyRepository);
var userWriteService = new UserService(userRepository);

/* ===== End  ===== */

/* ===== API Components setup ===== */

var AgencyController = require('../api/controllers/agency-controller');
var UserController = require('../api/controllers/user-controller');

var agencyController = new AgencyController(agencyWriteService, agencyRepository);
var userController = new UserController(userWriteService, userRepository);

/* ===== End  ===== */

require('./routes/agency-routes')(app, agencyController);
require('./routes/user-routes')(app, userController);

app.use(function(err, req, res, next) {
    console.error(new Date() + " - " + err.stack);
    next(err);
})

app.use(function(err, req, res, next) {
    res.status(500).send({ error: 'Something failed!' });
})

var port = 3000;
app.listen(port, function(){
    console.log("server is listening on port: ", port);
});

module.exports = app;