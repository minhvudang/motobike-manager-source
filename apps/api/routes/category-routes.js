var categoryResultMiddleWare = require('../middlewares/category-result');

module.exports = function(app, categoryController){
    app.route('/categories')
        .get(categoryController.getCategories, 
             categoryResultMiddleWare.getCategories)
        .post(categoryController.createCategory, 
              categoryResultMiddleWare.createCategory);
}