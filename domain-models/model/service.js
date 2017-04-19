var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../rules/service-rules');

var Service = function (params) {
    var self = this;

    var props = objectAssign({
        id: shortid.generate(),
    }, params);

    this.id = props.id;
    this.name = props.name;
    this.image = props.image;
    this.price = props.price;
    this.type = props.type;
    this.total = props.total;
    this.sale = props.sale;

    validate(rules, self);
}

function validate(rules, obj) {
    validator.run(rules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = Service;