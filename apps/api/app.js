process.env.NODE_ENV = 'local';

var express = require('express');
var queryHandler = require('express-api-queryhandler');
var bodyParser = require('body-parser');
var config = require('../../config/config');

/* ===== Express setup ===== */

var app  = express();
app.use(queryHandler.fields());
app.use(queryHandler.filter());
app.use(queryHandler.pagination({limit: 100}));
app.use(queryHandler.sort());
app.use(bodyParser.urlencoded({ extended: false }));

/* ===== End  ===== */

/* ===== Read-side Components setup ===== */

//Datacontext
var readDataContext = require('../../repository/read-store/data-context')(config.readStore);
var writeDataContext = require('../../repository/blob-store/data-context')(config.blobStore);

//Read Repository
var AuthorRepository = require('../../repository/read-store/author-repository');
var CategoryRepository = require('../../repository/read-store/category-repository');
var CourseRepository = require('../../repository/read-store/course-repository');

var authorRepository = new AuthorRepository(readDataContext);
var categoryRepository = new CategoryRepository(readDataContext);
var courseRepository = new CourseRepository(readDataContext);

/* ===== End  ===== */

/* ===== Write-side Components setup ===== */

//Message Queue
var KafkaProducer = require('../../messaging/kafka-producer');

//var kafkaProducer = new KafkaProducer(config.message.options, config.message.topic);
var kafkaProducer = new KafkaProducer(null, null);

//Write Repository
var BlobRepository = require('../../repository/blob-store/blob-repository');

var blobRepository = new BlobRepository(writeDataContext);

//Write Service
var AuthorService = require('../../services/write-services/author-services');
var CategoryService = require('../../services/write-services/category-services');
var CourseService = require('../../services/write-services/course-services');

var authorWriteService = new AuthorService(blobRepository, kafkaProducer);
var categoryWriteService = new CategoryService(blobRepository, kafkaProducer);
var courseWriteService = new CourseService(blobRepository, kafkaProducer);

/* ===== End  ===== */

/* ===== API Components setup ===== */

var AuthorController = require('../api/controllers/author-controller');
var CategoryController = require('../api/controllers/category-controller');
var CourseController = require('../api/controllers/course-controller');

var authorController = new AuthorController(authorWriteService, authorRepository);
var categoryController = new CategoryController(categoryWriteService, categoryRepository);
var courseController = new CourseController(courseWriteService, courseRepository);

/* ===== End  ===== */

require('./routes/author-routes')(app, authorController);
require('./routes/category-routes')(app, categoryController);

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