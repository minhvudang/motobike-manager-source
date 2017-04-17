var User = require('../domain-models/model/user');

var UserService = function (userRepository, messageProducer) {
    this.userRepository = userRepository;
    this.messageProducer = messageProducer;
}

UserService.prototype.create = function (userProps, callback) {
    var self = this;
    var userInstance = null;

    try {
        userInstance = new User(userProps);
    } catch (err) {
        return callback({
            type: 'Bad Request',
            err: err
        });
    };

    self.userRepository.save(userInstance, function (err, user) {
        if (err) return callback(err);
    
        return callback(null, userInstance);
    });
}

UserService.prototype.update = function (username, password, newPassword, callback) {
    var self = this;
    var userObj = null;
    var userInstance = null;
    var changedPropsObj = null;
    var change = null;

    change.userName = userName;
    change.password = newPassword;

    self.userRepository.findUser(username, password, function (err, userObj) {
        if (err) return callback(err);
        else if (!userObj) return callback({
            type: 'Not Found'
        });

        try {
            userInstance = new User(userObj);
            changedPropsObj = userInstance.update(change);
        } catch (err) {
            return callback({
                type: 'Bad Request',
                err: err
            });
        };

        self.userRepository.update(userInstance, function (err, result) {
            if (err) return callback(err);
            if (!result) return callback({
                type: 'Request Failed'
            })

            return callback(null, userInstance);
        });
    });
}

module.exports = UserService;