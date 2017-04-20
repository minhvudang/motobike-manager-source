var dependencies = {
    userRepository: null, 
    userWriteService: null
}

function UserController(userWriteService, userRepository) {
    dependencies.userRepository = userRepository;
    dependencies.userWriteService = userWriteService;
}

UserController.prototype.getUser = function (req, res, next) {
    var userName = req.query.username;
    var password = req.query.password;

    dependencies.userRepository.findUser(userName, password, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.user = user;
            next();
        }
    });
}

UserController.prototype.updateUser = function (req, res, next) {
    //TODO Validate props
    var userName = req.params.username;
    var password = req.params.password;
    var userObj = req.body;

    dependencies.userWriteService.update(userName, password, userObj.newPassword, function (err, updatedUser) {
        if (err) {
            next(err);
        } else {
            res.updatedUser = updatedUser;
            next();
        }
    });
}

UserController.prototype.createUser = function (req, res, next) {
    //TODO Validate props
    var userObj = req.body;
    
    dependencies.userWriteService.create(userObj, function (err, user) {
        if (err) {
            next(err);
        } else {
            res.user = user;
            next();
        }
    });
}

module.exports = UserController;