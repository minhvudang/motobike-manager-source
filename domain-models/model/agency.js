var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../../rules/agency-rules');

var Service = require('./service');

var Agency = function(params) {
    var self = this;
    var props = objectAssign({
        id: shortid.generate(),
        avatar: '',
    }, params);

    this.id = props.id;
    this.name = props.name;
    this.avatar = props.avatar;
    this.address = props.address;
    this.location = props.location;
    this.phone = props.phone;
    this.tax = props.tax;
    this.rating = props.rating;
    this.description = props.description;
    this.services = props.services.map(function(service) {
        var s = new Service(service);
        return s;
    });

    validate(rules, self);
}

Agency.prototype.update = function(params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        name: this.name,
        avatar: this.avatar,
        address: this.address,
        location: this.location,
        phone: this.phone,
        tax: this.tax,
        rating: this.rating,
        description: this.description
    }, params)

    self.name = props.name;
    self.avatar = props.avatar;
    self.address = props.address;
    self.location = props.location;
    self.phone = props.phone;
    self.tax = props.tax;
    self.rating = props.rating;
    self.description = props.description;

    validate(rules, self);

    var changed = diff(currentValue, self);
    changed.id = this.id;

    return changed;
}

function validate(rules, obj) {
    validator.run(rules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = Agency;