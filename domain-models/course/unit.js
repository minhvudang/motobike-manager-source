var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');

var rules = require('../rules/course-rules');

var Unit = function(params) {
    var self = this;

    var props = objectAssign({
        id: shortid.generate()
    }, params);

    self.id = props.id;
    self.chapterId = props.chapterId;
    self.courseId = props.courseId;
    self.name = props.name;
    self.type = props.type;
    self.duration = props.duration;
    self.source = props.source;

    validate(rules, self);
}

Unit.prototype.update = function(params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        name: this.name,
        duration: this.duration,
        source: this.source,
        type: this.type
    }, params);

    self.name = props.name;
    self.duration = props.duration;
    self.source = props.source;
    self.type = props.type;

    validate(rules, self);

    var changed = diff(currentValue, self);
    changed.id = self.id;

    return changed;
}

function validate(rules, obj) {
    validator.run(rules.unitRules, obj, function(errorCount, errors) {
        if(errorCount > 0) throw errors;
        // else {
        //     if(!rules.unitTypeRules(obj)) {
        //         throw [{
        //             parameter: 'Type-Source',
        //             message: 'Invalid Type and Source'
        //         }];
        //     }
        // }
    });
}

module.exports = Unit;