var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');
var rules = require('../rules/agency-rules');

var Service = require('./service');

var Agency = function(params) {
    var self = this;
    var props = null;
    
    if (!params.id) {
        props = objectAssign({
            id: shortid.generate(),
            services: []
        }, { 
            name: params.name, 
            avatar: params.avatar, 
            address: params.address, 
            location: params.location, 
            phone: params.phone, 
            tax: params.tax, 
            rating: params.rating, 
            description: params.description, 
            services: params.services });
    } else {
        props = objectAssign({
            services: []
        }, { 
            id: params.id,
            name: params.name, 
            avatar: params.avatar, 
            address: params.address, 
            location: params.location, 
            phone: params.phone, 
            tax: params.tax, 
            rating: params.rating, 
            description: params.description, 
            services: params.services });
    }

    this.id = props.id;
    this.name = props.name;
    this.avatar = props.avatar;
    this.address = props.address;
    this.location = props.location;
    this.phone = props.phone;
    this.tax = props.tax;
    this.rating = props.rating;
    this.description = props.description;
    this.services = props.services;

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

Agency.prototype.addService = function(serviceProps) {
    var currentValue = objectAssign({}, this);

    var service = new Service(serviceProps);
    if(!this.services) {
        this.services = [];
    }
    this.services.push(service);

    var changed = diff(currentValue, this);
  
    return changed;
}

Agency.prototype.updateService = function(serviceProps) {
    var currentValue = objectAssign({}, this);

    var service = this.services.find(function(s) { 
        return s.id == serviceProps.id;
    });

    if(service) {
        service = objectAssign(service, serviceProps);
        
        var changed = diff(currentValue, this);
        changed.id = this.id;
        changed.service = service;

        return changed;
    } else {
        return null;
    }
}

Agency.prototype.deleteService = function(servicePropsId) {
    var currentValue = objectAssign({}, this);

    var serviceIndex = this.services.findIndex(function(s) { 
        return s.id == servicePropsId;
    });

    if(serviceIndex >= 0) {
        this.services.splice(serviceIndex, 1);
        return true;
    } else {
        return false;
    }
}


function validate(rules, obj) {
    validator.run(rules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = Agency;