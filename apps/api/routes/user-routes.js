var userResultMiddleWare = require('../middlewares/user-result');

module.exports = function(app, userController){
    app.route('users/login')
        .get(userController.getUser, 
             userResultMiddleWare.getUser);
    app.route('users/changepass')
        .put(userController.updateUser,
            userResultMiddleWare.updateUser);
    app.route('users/create')
        .post(userController.createUser,
            userResultMiddleWare.createUser);
}
