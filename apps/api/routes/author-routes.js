var authorResultMiddleWare = require('../middlewares/author-result');

module.exports = function(app, authorController){
    app.route('/authors/:authorId')
        .get(authorController.getAuthor, 
             authorResultMiddleWare.getAuthor)
        .put(authorController.updateAuthor, 
             authorResultMiddleWare.updateAuthor);
    app.route('/authors')
        .get(authorController.getAuthors,
            authorResultMiddleWare.getAuthors)
        .post(authorController.createAuthor,
             authorResultMiddleWare.createAuthor);
}
