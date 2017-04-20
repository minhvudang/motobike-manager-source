var objectAssign = require('object-assign');

var UserRepository = function(dbContext) {
    this.dbContext = dbContext;
    this.User = dbContext.User;
}

UserRepository.prototype.findUser = function(userName, password, callback) {
    this.User
        .findOne({
            where: { 
                'username': userName,
                'password': password
            }
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

UserRepository.prototype.save = function(userObj, callback) {
    this.User
        .create(userObj)
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

UserRepository.prototype.update = function(id, userObj, callback) {
    this.User
        .update(userObj, { 
            where: { 'id': id } 
        })
        .then(function(result) {
            if(result.every(function(val){
                return val == 1;
            })){
                callback(null, true);
            }else{
                callback(null, false);
            }
        })
        .catch(function(err) {
            callback(err, null);
        });
}

UserRepository.prototype.delete = function(condition, callback) {
    this.User
        .destroy({
            where: condition ? condition : null
        })
        .then(function(result) {
            callback(null, result);
        })
        .catch(function(err) {
            callback(err, null);
        });
}

module.exports = UserRepository;
