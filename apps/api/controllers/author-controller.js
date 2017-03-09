var dependencies = {
    authorRepository: null, 
    authorWriteService: null
}

function AuthorController(authorWriteService, authorRepository) {
    dependencies.authorRepository = authorRepository;
    dependencies.authorWriteService = authorWriteService;
}

AuthorController.prototype.getAuthor = function (req, res, next) {
    var authorId = req.params.authorId;
    var select = req.fields ? req.fields.split(" ") : [];

    dependencies.authorRepository.findById(authorId, select, function (err, author) {
        if (err) {
            next(err);
        } else {
            res.author = author;
            next();
        }
    });
}

AuthorController.prototype.getAuthors = function (req, res, next) {
    var select = req.fields ? req.fields.split(" ") : [];
    var limit = req.options.limit;
    var page = req.options.skip;

    dependencies.authorRepository.findAll(select, page, limit, function (err, authors) {
        if (err) {
            next(err);
        } else {
            res.authors = authors;
            next();
        }
    });
}

AuthorController.prototype.updateAuthor = function (req, res, next) {
    //TODO Validate props
    var authorId = req.params.authorId;
    var authorObj = req.body;
    authorObj.id = authorId;

    dependencies.authorWriteService.update(authorObj, function (err, updatedAuthor) {
        //result: true-author is updated or false-nothing is updated
        if (err) {
            next(err);
        } else {
            res.updatedAuthor = updatedAuthor;
            next();
        }
    });
}

AuthorController.prototype.createAuthor = function (req, res, next) {
    //TODO Validate props
    var authorObj = req.body;
    
    dependencies.authorWriteService.create(authorObj, function (err, author) {
        if (err) {
            next(err);
        } else {
            res.author = author;
            next();
        }
    });
}

module.exports = AuthorController;