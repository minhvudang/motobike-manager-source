var dependencies = {
    categoryRepository: null, 
    categoryWriteService: null
}

function CategoryController(categoryWriteService, categoryRepository) {
    dependencies.categoryRepository = categoryRepository;
    dependencies.categoryWriteService = categoryWriteService;
}

CategoryController.prototype.getCategories = function (req, res, next) {
    dependencies.categoryRepository.findAll(function (err, categories) {
        if (err) {
            next(err);
        } else {
            res.categories = categories;
            next();
        }
    });
}

CategoryController.prototype.createCategory = function (req, res, next) {
    //TODO Validate props
    var categoryObj = req.body;

    dependencies.categoryWriteService.create(categoryObj, function (err, category) {
        if (err) {
            next(err);
        } else {
            res.category = category;
            next();
        }
    });
}

module.exports = CategoryController;