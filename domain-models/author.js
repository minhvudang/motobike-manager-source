var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('./rules/author-rules');

var Author = function(params) {
    var self = this;

    var props = objectAssign({
        id: shortid.generate(),
        avatar: '/defaultAvatar.jpg'
    }, params);

    self.id = props.id;
    self.name = props.name;
    self.title = props.title;
    self.description = props.description;
    self.avatar = props.avatar;

    validate(rules, self);
}

Author.prototype.update = function(params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        name: this.name,
        title: this.title,
        description: this.description,
        avatar: this.avatar
    }, params);

    self.name = props.name;
    self.title = props.title;
    self.description = props.description;
    self.avatar = props.avatar;

    validate(rules, self);

    var changed = diff(currentValue, self);
    changed.id = self.id;

    return  changed;
}

function validate(rules, obj) {
    validator.run(rules, obj, function(errorCount, errors) {
        if(errorCount > 0) throw errors;
    });
}

module.exports = Author;