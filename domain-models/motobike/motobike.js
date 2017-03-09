var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');

var rules = require('../rules/motobike-rules');

var Motobike = function (params) {
    var self = this;

    var props = objectAssign({
        id: shortid.generate(),
    }, paramms);

    this.id = props.id;
    this.owner = props.owner;
    this.type = props.type;
    this.price = props.price

    validate(rules, self);
}

function validate(rules, obj) {
    validator.run(rules.courseRules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = Motobike;
