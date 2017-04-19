var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../rules/customer-rules');

var Customer = function (params) {
  var props = objectAssign({
        id: shortid.generate(),
        agencies: []
    }, { id: params.id, 
        name: params.name, 
        produce: params.produce, 
        motoType: params.motoType, 
        address: params.address, 
        phoneNumber: params.phoneNumber, 
        agencies: params.agencies });

    this.id = props.id;
    this.name = props.name;
    this.produce = props.produce;
    this.motoType = props.motoType;
    this.address = props.address;
    this.phoneNumber = props.phoneNumber;
    this.agencies = props.agencies;

    validate(rules, self);
}

function validate(rules, obj) {
    validator.run(rules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = User;