var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var rules = require('./rules/category-rules');

var Category = function(params) {
    var self = this;

    var props = objectAssign({
        id: shortid.generate()
    }, params);

    self.id = props.id;
    self.name = props.name;

    validate(rules, self);
}

function validate(rules, obj) {
    validator.run(rules, obj, function(errorCount, errors) {
        if(errorCount > 0) throw errors;
    });
}

module.exports = Category;