var shortid = require('shortid');
var objectAssign = require('object-assign');
var validator = require('node-validator');
var diff = require('object-diff');

var rules = require('../rules/course-rules');
var Chapter = require('./chapter');
var Unit = require('./unit');
var CourseState = require('./course-state');

var Course = function (params) {
    var self = this;

    var props = objectAssign({
        id: shortid.generate(),
        state: CourseState.UNPUBLISH,
        chapters: [],
        originPrice: 0,
        sellPrice: 0,
        cover: '/defaultCover.jpg'
    }, params, {
            totalDuration: 0,
            totalChapter: 0,
            totalUnit: 0
        });

    this.id = props.id;
    this.title = props.title;
    this.originPrice = props.originPrice;
    this.sellPrice = props.sellPrice;
    this.state = props.state;
    this.categoryId = props.categoryId;
    this.authorId = props.authorId;
    this.cover = props.cover;
    this.description = props.description;
    this.chapters = props.chapters.map(function (chapter) {
        chapter.courseId = props.id;
        var c = new Chapter(chapter);

        props.totalDuration += c.totalDuration;
        props.totalChapter += 1;
        props.totalUnit += c.totalUnit;

        return c;
    })

    this.totalDuration = props.totalDuration;
    this.totalChapter = props.totalChapter;
    this.totalUnit = props.totalUnit;

    validate(rules, self);
}

Course.prototype.toggleState = function (state) {
    this.state = state;

    return {
        id: this.id,
        state: this.state
    }
}

Course.prototype.update = function (params) {
    var self = this;
    var currentValue = objectAssign({}, this);

    var props = objectAssign({
        title: this.title,
        originPrice: this.originPrice,
        sellPrice: this.sellPrice,
        categoryId: this.categoryId,
        cover: this.cover,
        description: this.description
    }, params);

    self.title = props.title;
    self.originPrice = props.originPrice;
    self.sellPrice = props.sellPrice;
    self.categoryId = props.categoryId;
    self.cover = props.cover;
    self.description = props.description;

    validate(rules, self);

    var changed = diff(currentValue, self);
    changed.id = this.id;

    return changed;
}

Course.prototype.addChapter = function (chapterProps) {
    var currentValue = objectAssign({}, this);

    chapterProps.courseId = this.id;
    var chapter = new Chapter(chapterProps)
    this.totalDuration += chapter.totalDuration;
    this.totalChapter += 1;
    this.totalUnit += chapter.units.length;
    this.chapters.push(chapter);

    var changed = diff(currentValue, this);
    changed.chapter = chapter;
    changed.id = this.id;

    return changed;
}

Course.prototype.updateChapter = function (chapterProps) {
    var chapter = this.chapters.find(function (c) {
        return c.id == chapterProps.id
    });

    if (chapter) {
        var changed = {
            id: this.id,
            chapter: chapter.update(chapterProps),
        }

        return changed;
    } else {
        return null;
    }
}

Course.prototype.addUnit = function (unitProps) {
    var chapter = this.chapters.find(function (c) {
        return c.id == unitProps.chapterId
    });

    if (chapter) {
        var currentValue = objectAssign({}, this);
        var chapterChanged = chapter.addUnit(unitProps);
        this.totalDuration = this.totalDuration + chapterChanged.unit.duration;
        this.totalUnit += 1;

        var changed = diff(currentValue, this);
        changed.chapter = chapterChanged;
        changed.id = this.id;

        return changed;
    } else {
        return null;
    }
}

Course.prototype.updateUnit = function (unitProps) {
    var chapter = this.chapters.find(function (c) {
        return c.id == unitProps.chapterId
    });

    if (chapter) {
        var unit = chapter.units.find(function (u) {
            return u.id == unitProps.id
        });

        if (unit) {
            var currentValue = objectAssign({}, this);
            var oldDuration = unit.duration;
            var chapterChanged = chapter.updateUnit(unitProps);
            this.totalDuration = this.totalDuration - oldDuration + chapterChanged.unit.duration;

            var changed = diff(currentValue, this);
            changed.chapter = chapterChanged;
            changed.id = this.id;

            return changed;
        }
    }
    return null;
}

function validate(rules, obj) {
    validator.run(rules.courseRules, obj, function (errorCount, errors) {
        if (errorCount > 0) throw errors;
    });
}

module.exports = Course;