var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../rules/customer-rules');

var Customer = function (params) {
    var self = this;
    var props = null;
    if(!params.id) {
        props = objectAssign({
            id: shortid.generate(),
            agencies: []
        }, { 
            name: params.name, 
            produce: params.produce, 
            motoType: params.motoType, 
            address: params.address, 
            phoneNumber: params.phoneNumber, 
            agencies: params.agencies });
    } else {
        props = objectAssign({
            agencies: []
        }, { 
            id: params.id,
            name: params.name, 
            produce: params.produce, 
            motoType: params.motoType, 
            address: params.address, 
            phoneNumber: params.phoneNumber, 
            agencies: params.agencies });
    }

    this.id = props.id;
    this.name = props.name;
    this.produce = props.produce;
    this.motoType = props.motoType;
    this.address = props.address;
    this.phoneNumber = props.phoneNumber;
    this.agencies = props.agencies;

    validate(rules, self);
}

Customer.prototype.update = function(params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        name: this.name,
        avatar: this.produce,
        motoType: this.motoType,
        address: this.address,
        phoneNumber: this.phoneNumber,
    }, params)

    self.name = props.name;
    self.produce = props.produce;
    self.motoType = props.motoType;
    self.address = props.address;
    self.phoneNumber = props.phoneNumber;

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

module.exports = Customer;