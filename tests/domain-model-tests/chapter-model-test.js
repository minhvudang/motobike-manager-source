var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');

var Chapter = require('../../domain-models/course/chapter');
var Unit = require('../../domain-models/course/unit');

describe('Create new Chapter with empty Unit', function () {
    it('must return new Chapter with random id, empty Unit and correct property', function () {
        var courseId = shortid.generate();

        var chapter = new Chapter({
            courseId: courseId,
            name: 'Chapter 1'
        });

        assert.isString(chapter.id);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 0);
        assert.equal(chapter.totalDuration, 0);
        assert.equal(chapter.totalUnit, 0);

        try {
            chapter = new Chapter({
                courseId: 0,
                name: '123',
            });
        } catch (Error) {
            var invalidProps = ['name', 'courseId'];
            var validProps = ['totalDuration', 'totalUnit', 'id'];

            Error.forEach(function (e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 2);
        }
    })
})

describe('Create new Chapter with Unit', function () {
    it('must return new Chapter with random id and correct property', function () {
        var courseId = shortid.generate();

        var chapter = new Chapter({
            courseId: courseId,
            name: 'Chapter 1',
            units: [
                {
                    name: 'Unit 1',
                    duration: 120,
                    source: '/test.mp3',
                    type: 'AUDIO'
                },
                {
                    name: 'Unit 2',
                    duration: 140,
                    source: '/test.mp4',
                    type: 'VIDEO'
                }
            ]
        });

        assert.isString(chapter.id);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 2);
        assert.equal(chapter.totalDuration, 260);
        assert.equal(chapter.totalUnit, 2);

        assert.isString(chapter.units[0].id);
        assert.equal(chapter.units[0].name, 'Unit 1');
        assert.equal(chapter.units[0].duration, 120);
        assert.equal(chapter.units[0].source, '/test.mp3');
        assert.equal(chapter.units[0].type, 'AUDIO');

        assert.isString(chapter.units[1].id);
        assert.equal(chapter.units[1].name, 'Unit 2');
        assert.equal(chapter.units[1].duration, 140);
        assert.equal(chapter.units[1].source, '/test.mp4');
        assert.equal(chapter.units[1].type, 'VIDEO');
    })
})

describe('Serialize Chapter from Object', function () {
    it('must return Chapter equal Object', function () {
        var courseId = shortid.generate();
        var chapterId = shortid.generate();

        var chapter = new Chapter({
            id: chapterId,
            courseId: courseId,
            name: 'Chapter 1',
            totalDuration: 120,
            units: [
                {
                    name: 'Unit 1',
                    duration: 120,
                    source: '/test.mp3',
                    type: 'AUDIO'
                },
                {
                    name: 'Unit 2',
                    duration: 140,
                    source: '/test.mp4',
                    type: 'VIDEO'
                }
            ]
        });

        assert.isString(chapter.id);
        assert.equal(chapter.id, chapterId);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 2);
        assert.equal(chapter.totalDuration, 260);
        assert.equal(chapter.totalUnit, 2);

        assert.isString(chapter.units[0].id);
        assert.equal(chapter.units[0].courseId, courseId);
        assert.equal(chapter.units[0].chapterId, chapterId);
        assert.equal(chapter.units[0].name, 'Unit 1');
        assert.equal(chapter.units[0].duration, 120);
        assert.equal(chapter.units[0].source, '/test.mp3');
        assert.equal(chapter.units[0].type, 'AUDIO');

        assert.isString(chapter.units[1].id);
        assert.equal(chapter.units[1].courseId, courseId);
        assert.equal(chapter.units[1].chapterId, chapterId);
        assert.equal(chapter.units[1].name, 'Unit 2');
        assert.equal(chapter.units[1].duration, 140);
        assert.equal(chapter.units[1].source, '/test.mp4');
        assert.equal(chapter.units[1].type, 'VIDEO');
    })
})

describe('Update Chapter', function () {
    it('property changes correctly', function () {
        var courseId = shortid.generate();

        var chapter = new Chapter({
            courseId: courseId,
            name: 'Chapter 1'
        });

        var newId = chapter.id;

        try {
            chapter.update({
                id: '12v4f',
                name: '',
                courseId: 'sudyv23f'
            })
        } catch(Error) {
            var invalidProps = ['name'];
            var validProps = ['id', 'courseId'];

            Error.forEach(function(e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 1);   
        }

        var updatedChapter = chapter.update({
            id: '12v4f',
            name: 'Chapter 2',
            courseId: 'sudyv23f',
            units: [{
                name: 'Unit 1',
                duration: 120,
                source: '/test.mp3',
                type: 'AUDIO'
            }]
        })

        assert.isString(chapter.id);
        assert.isString(chapter.id, newId);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 2');
        assert.equal(chapter.units.length, 0);
        assert.equal(chapter.totalDuration, 0);
        assert.equal(chapter.totalUnit, 0);

        assert.equal(updatedChapter.id, newId);
        assert.equal(updatedChapter.name, 'Chapter 2');
    })
})

describe('Add Unit to Chapter', function () {
    it('add Unit and property changes correctly', function () {
        var courseId = shortid.generate();

        var chapter = new Chapter({
            courseId: courseId,
            name: 'Chapter 1'
        });

        var newId = chapter.id;

        var changed = chapter.addUnit({
            name: 'Unit 1',
            duration: 120,
            source: '/test.mp3',
            type: 'AUDIO'
        })

        assert.equal(chapter.id, newId);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 1);
        assert.equal(chapter.totalDuration, 120);
        assert.equal(chapter.totalUnit, 1);

        assert.equal(changed.id, newId);
        assert.equal(changed.totalDuration, 120);
        assert.equal(changed.totalUnit, 1);

        assert.isString(chapter.units[0].id);
        assert.equal(chapter.units[0].courseId, courseId);
        assert.equal(chapter.units[0].chapterId, newId);
        assert.equal(chapter.units[0].name, 'Unit 1');
        assert.equal(chapter.units[0].duration, 120);
        assert.equal(chapter.units[0].source, '/test.mp3');
        assert.equal(chapter.units[0].type, 'AUDIO');

        var addedUnit = changed.unit;
        assert.equal(addedUnit.id, chapter.units[0].id);
        assert.equal(addedUnit.courseId, chapter.units[0].courseId);
        assert.equal(addedUnit.chapterId, chapter.units[0].chapterId);
        assert.equal(addedUnit.name, chapter.units[0].name);
        assert.equal(addedUnit.duration, chapter.units[0].duration);
        assert.equal(addedUnit.source, chapter.units[0].source);
        assert.equal(addedUnit.type, chapter.units[0].type);

        changed = chapter.addUnit({
            name: 'Unit 2',
            duration: 140,
            source: '/test.mp4',
            type: 'VIDEO'
        })

        assert.equal(chapter.id, newId);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 2);
        assert.equal(chapter.totalDuration, 260);
        assert.equal(chapter.totalUnit, 2);

        assert.equal(changed.id, newId);
        assert.equal(changed.totalDuration, 260);
        assert.equal(changed.totalUnit, 2);

        assert.isString(chapter.units[0].id);
        assert.equal(chapter.units[0].courseId, courseId);
        assert.equal(chapter.units[0].chapterId, newId);
        assert.equal(chapter.units[0].name, 'Unit 1');
        assert.equal(chapter.units[0].duration, 120);
        assert.equal(chapter.units[0].source, '/test.mp3');
        assert.equal(chapter.units[0].type, 'AUDIO');

        assert.isString(chapter.units[1].id);
        assert.equal(chapter.units[1].courseId, courseId);
        assert.equal(chapter.units[1].chapterId, newId);
        assert.equal(chapter.units[1].name, 'Unit 2');
        assert.equal(chapter.units[1].duration, 140);
        assert.equal(chapter.units[1].source, '/test.mp4');
        assert.equal(chapter.units[1].type, 'VIDEO');

        addedUnit = changed.unit;
        assert.equal(addedUnit.id, chapter.units[1].id);
        assert.equal(addedUnit.courseId, chapter.units[1].courseId);
        assert.equal(addedUnit.chapterId, chapter.units[1].chapterId);
        assert.equal(addedUnit.name, chapter.units[1].name);
        assert.equal(addedUnit.duration, chapter.units[1].duration);
        assert.equal(addedUnit.source, chapter.units[1].source);
        assert.equal(addedUnit.type, chapter.units[1].type);
    })
})

describe('Update exist Unit', function () {
    it('property changes correctly', function () {
        var courseId = shortid.generate();

        var chapter = new Chapter({
            courseId: courseId,
            name: 'Chapter 1',
            totalDuration: 120,
            units: [
                {
                    name: 'Unit 1',
                    duration: 120,
                    source: '/test.mp3',
                    type: 'AUDIO'
                },
                {
                    name: 'Unit 2',
                    duration: 140,
                    source: '/test.mp4',
                    type: 'VIDEO'
                }
            ]
        });
        var newId = chapter.id;

        var updateUnitProps = {
            id: chapter.units[0].id,
            name: 'Unit A',
            duration: 150,
            source: '/test.mp4',
            type: 'VIDEO'
        }

        var changed = chapter.updateUnit(updateUnitProps);

        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 2);
        assert.equal(chapter.totalDuration, 290);
        assert.equal(chapter.totalUnit, 2);

        assert.isString(chapter.units[0].id);
        assert.equal(chapter.units[0].courseId, courseId);
        assert.equal(chapter.units[0].chapterId, newId);
        assert.equal(chapter.units[0].name, 'Unit A');
        assert.equal(chapter.units[0].duration, 150);
        assert.equal(chapter.units[0].source, '/test.mp4');
        assert.equal(chapter.units[0].type, 'VIDEO');

        assert.equal(changed.id, newId);
        assert.equal(changed.totalDuration, 290);

        var updatedUnit = changed.unit;
        assert.equal(updatedUnit.id, updateUnitProps.id);
        assert.equal(updatedUnit.name, 'Unit A');
        assert.equal(updatedUnit.duration, 150);
        assert.equal(updatedUnit.source, '/test.mp4');
        assert.equal(updatedUnit.type, 'VIDEO');
    })
})

describe('Update not exist Unit', function () {
    it('do nothing', function () {
        var courseId = shortid.generate();

        var chapter = new Chapter({
            courseId: courseId,
            name: 'Chapter 1',
            totalDuration: 120,
            units: [
                {
                    name: 'Unit 1',
                    duration: 120,
                    source: '/test.mp3',
                    type: 'AUDIO'
                },
                {
                    name: 'Unit 2',
                    duration: 140,
                    source: '/test.mp4',
                    type: 'VIDEO'
                }
            ]
        });

        var newId = chapter.id;

        var updateUnitProps = {
            id: '23423412e',
            name: 'Unit A',
            duration: 150,
            source: '/test.mp4',
            type: 'VIDEO'
        }

        var changed = chapter.updateUnit(updateUnitProps);

        assert.isString(chapter.id);
        assert.equal(chapter.id, newId);
        assert.equal(chapter.courseId, courseId);
        assert.equal(chapter.name, 'Chapter 1');
        assert.equal(chapter.units.length, 2);
        assert.equal(chapter.totalDuration, 260);
        assert.equal(chapter.totalUnit, 2);

        assert.isString(chapter.units[0].id);
        assert.equal(chapter.units[0].courseId, courseId);
        assert.equal(chapter.units[0].chapterId, newId);
        assert.equal(chapter.units[0].name, 'Unit 1');
        assert.equal(chapter.units[0].duration, 120);
        assert.equal(chapter.units[0].source, '/test.mp3');
        assert.equal(chapter.units[0].type, 'AUDIO');

        assert.isString(chapter.units[1].id);
        assert.equal(chapter.units[1].courseId, courseId);
        assert.equal(chapter.units[1].chapterId, newId);
        assert.equal(chapter.units[1].name, 'Unit 2');
        assert.equal(chapter.units[1].duration, 140);
        assert.equal(chapter.units[1].source, '/test.mp4');
        assert.equal(chapter.units[1].type, 'VIDEO');

        assert.equal(changed, null);
    })
})