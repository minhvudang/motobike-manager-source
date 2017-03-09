var validator = require('node-validator');
var SpecificationSync = require("specification").SpecificationSync;

function IsAudio() {
    this.type = 'AUDIO';
    this.ext = 'mp3';
}

IsAudio.prototype = Object.create(SpecificationSync);
IsAudio.prototype.isSatisfiedBy = function(obj) {
    var ext = (obj.source.split('.')).slice(-1)[0].trim().toLowerCase();
    return (obj.type == this.type 
            && ext== this.ext)
}

function IsVideo() {
    this.type = 'VIDEO';
    this.ext = 'mp4';
}

IsVideo.prototype = Object.create(SpecificationSync);
IsVideo.prototype.isSatisfiedBy = function(obj) {
    var ext = (obj.source.split('.')).slice(-1)[0].trim().toLowerCase();
    return (obj.type == this.type 
            && ext == this.ext)
}

function IsText() {
    this.type = 'TEXT';
    this.ext = 'doc';
}

IsText.prototype = Object.create(SpecificationSync);
IsText.prototype.isSatisfiedBy = function(obj) {
    var ext = (obj.source.split('.')).slice(-1)[0].trim().toLowerCase();
    return (obj.type == this.type 
            && ext == this.ext)
}

module.exports = {
    unitRules: validator.isAnyObject()
        .withRequired('chapterId', validator.isString({regex: /^[a-zA-Z0-9_-]{2,14}$/}))
        .withRequired('courseId', validator.isString({regex: /^[a-zA-Z0-9_-]{2,14}$/}))
        .withRequired('name', validator.isString({regex: /^.{5,30}$/}))
        .withRequired('type', validator.isString({regex: /(VIDEO|AUDIO|TEXT)/}))
        .withRequired('duration', validator.isInteger({min: 0}))
        .withRequired('source', validator.isString({ regex: /^.+$/ })),
    chapterRules: validator.isAnyObject()
        .withRequired('courseId', validator.isString({regex: /^[a-zA-Z0-9_-]{2,14}$/}))
        .withRequired('name', validator.isString({regex: /^.{5,30}$/})),
    courseRules: validator.isAnyObject()
        .withRequired('title', validator.isString({regex: /^.{10,30}$/}))
        .withRequired('description', validator.isString({regex: /^.{5,300}$/}))
        .withRequired('categoryId', validator.isString({regex: /^[a-zA-Z0-9_-]{2,14}$/}))
        .withRequired('authorId', validator.isString({regex: /^[a-zA-Z0-9_-]{2,14}$/}))
        .withRequired('cover', validator.isString({ regex: /^.+$/ }))
        .withRequired('originPrice', validator.isInteger({ min: 0 }))
        .withRequired('sellPrice', validator.isInteger({ min: 0 })),
    unitTypeRules: function(obj) {
        var isAudio = new IsAudio();
        var isVideo = new IsVideo();
        var isText = new IsText();

        var isValidType = isAudio.or(isVideo).or(isText);
        return isValidType.isSatisfiedBy(obj);
    }
}