var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../rules/user-rules');

var User = function (params) {
    var self = this;
    var props = null;

    if (!params.id) {
        props = objectAssign({
            id: shortid.generate(),
        }, { 
            userName: params.userName,
            password: params.password,
            userType: params.userType
    })} else {
        props = objectAssign({
        }, { 
            id: params.id,
            userName: params.userName,
            password: params.password,
            userType: params.userType
    })}

    self.id = props.id;
    self.userName = props.userName;
    self.password = props.password;
    if(props.userType) {
        self.userType = props.userType;
    }
    
    validate(rules, self);
}

User.prototype.update = function (params) {
    var self = this;

    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        userName: this.userName,
        password: this.password,
        userType: this.userType,
    }, params);

    self.userName = props.userName;
    self.password = props.password;
    self.userType = props.userType;

    var changed = diff(currentValue, self);
    changed.id = self.id;

    return changed;
}

function validate(rules, obj) {
    validator.run(rules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = User;