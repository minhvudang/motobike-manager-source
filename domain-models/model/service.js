var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../../rules/service-rules');

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

Service.prototype.update = function (params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        name: this.name,
        image: this.image,
        price: this.price,
        type: this.type,
        total: this.total,
        sale: this.sale
    }, params);

    self.name = props.name;
    self.image = props.image;
    self.price = props.price;
    self.type = props.type;
    self.total = props.total;
    self.sale = props.sale;

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

module.exports = Service;