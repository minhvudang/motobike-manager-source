var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');

var rules = require('../rules/course-rules');
var Unit = require('./unit');

var Chapter = function(params) {
    var self = this;
    var props = objectAssign({
        id: shortid.generate(),
        units: []
    }, params, {
        totalDuration: 0,
        totalUnit: 0
    });

    this.id = props.id;
    this.courseId = props.courseId;
    this.name = props.name;
    this.units = props.units.map(function(unit) {
        unit.chapterId = props.id;
        unit.courseId = props.courseId;

        var u = new Unit(unit);
        props.totalDuration += u.duration;
        props.totalUnit += 1;

        return u;
    });

    this.totalDuration = props.totalDuration;
    this.totalUnit = props.totalUnit;

    validate(rules, self);
}

Chapter.prototype.update = function(params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        name: this.name
    }, params)

    self.name = props.name;

    validate(rules, self);

    var changed = diff(currentValue, self);
    changed.id = this.id;

    return changed;
}

Chapter.prototype.addUnit = function(unitProps) {
    var currentValue = objectAssign({}, this);

    unitProps.chapterId = this.id;
    unitProps.courseId = this.courseId;

    var unit = new Unit(unitProps);
    this.units.push(unit);
    this.totalDuration += unit.duration;
    this.totalUnit += 1;

    var changed = diff(currentValue, this);
    changed.id = this.id;
    changed.unit = unit;

    return changed;
}

Chapter.prototype.updateUnit = function(unitProps) {
    var currentValue = objectAssign({}, this);

    var unit = this.units.find(function(u) { 
        return u.id == unitProps.id;
    });

    if(unit) {
        var oldDuration = unit.duration;
        if(oldDuration != unitProps.duration) {
            this.totalDuration = this.totalDuration - oldDuration + unitProps.duration;
        }

        var changedUnit = unit.update(unitProps);
        changedUnit.id = unit.id;
        
        var changed = diff(currentValue, this);
        changed.id = this.id;
        changed.unit = changedUnit;

        return changed
    } else {
        return null;
    }
}

function validate(rules, obj) {
    validator.run(rules.chapterRules, obj, function(errorCount, errors) {
        if(errorCount > 0) throw errors;
    });
}

module.exports = Chapter;