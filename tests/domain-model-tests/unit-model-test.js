var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');

var Unit = require('../../domain-models/course/unit');
var UnitType = require('../../domain-models/course/unit-type');

describe('Create new Unit', function() {
    it('must return new Unit with random id and correct property', function () {
        var chapterId = shortid.generate();
        var courseId = shortid.generate();

        var unit = new Unit({
            courseId: courseId,
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        });

        assert.isString(unit.id);
        assert.equal(unit.courseId, courseId);
        assert.equal(unit.chapterId, chapterId);
        assert.equal(unit.name, 'Unit 1');
        assert.equal(unit.duration, 120);
        assert.equal(unit.type, UnitType.AUDIO);
        assert.equal(unit.source, '/test.mp3');

        try {
            unit = new Unit({
                courseId: courseId,
                chapterId: 0,
                name: '',
                duration: '120',
                type: 'BLAHBLAH',
                source: '/test.mp3'
            });
        } catch(Error) {
            var invalidProps = ['chapterId', 'name', 'duration', 'type'];
            var validProps = ['courseId', 'source'];

            Error.forEach(function(e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 4);   
        }

        try {
            unit = new Unit({
                courseId: courseId,
                chapterId: chapterId,
                name: 'Unit Test',
                duration: -1,
                type: UnitType.AUDIO,
                source: '/test.mp3'
            });
        } catch(Error) {
            var invalidProps = ['duration'];
            var validProps = ['courseId', 'chapterId', 'name', 'source', 'type'];

            Error.forEach(function(e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 1);   
        }
    })
})

describe('Serialize Unit from Object', function() {
    it('must return Unit equal Object', function() {
        var unitId = shortid.generate();
        var chapterId = shortid.generate();
        var courseId = shortid.generate();

        var unit = new Unit({
            id: unitId,
            courseId: courseId,
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        });

        assert.isString(unit.id);
        assert.equal(unit.id, unitId);
        assert.equal(unit.courseId, courseId);
        assert.equal(unit.chapterId, chapterId);
        assert.equal(unit.name, 'Unit 1');
        assert.equal(unit.duration, 120);
        assert.equal(unit.type, UnitType.AUDIO);
        assert.equal(unit.source, '/test.mp3');
    })
})

describe('Update Unit', function() {
    it('property changes correctly', function() {
        var chapterId = shortid.generate();
        var courseId = shortid.generate();

        var unit = new Unit({
            courseId: courseId,
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        });
        var newId = unit.id;

        var updatedUnit = unit.update({
            courseId: courseId,
            chapterId: chapterId,
            name: 'Unit 1',
            duration: 120,
            type: UnitType.AUDIO,
            source: '/test.mp3'
        });

        assert.deepEqual(updatedUnit, {id: unit.id});

        updatedUnit = unit.update({
            id: '123123',
            chapterId: '12313123',
            courseId: '123133',
            name: 'Unit 2',
            duration: 140,
            type: UnitType.VIDEO,
            source: '/test.mp4'
        });

        assert.isString(unit.id);
        assert.equal(unit.id, newId);
        assert.equal(unit.courseId, courseId);
        assert.equal(unit.chapterId, chapterId);
        assert.equal(unit.name, 'Unit 2');
        assert.equal(unit.duration, 140);
        assert.equal(unit.type, UnitType.VIDEO);
        assert.equal(unit.source, '/test.mp4');

        assert.equal(updatedUnit.id, unit.id);
        assert.equal(updatedUnit.chapterId, undefined);
        assert.equal(updatedUnit.courseId, undefined);
        assert.equal(updatedUnit.name, 'Unit 2');
        assert.equal(updatedUnit.duration, 140);
        assert.equal(updatedUnit.type, UnitType.VIDEO);
        assert.equal(updatedUnit.source, '/test.mp4');

        try {
            assert.throws(unit.update({
                name: '',
                duration: -120,
                type: 'BLEOBLEO',
                source: '/test.mp4'
            }));
        } catch(Error) {
            var invalidProps = ['name', 'duration', 'type'];
            var validProps = ['source'];

            Error.forEach(function(e) {
                assert.equal(invalidProps.includes(e.parameter), true);
                assert.equal(validProps.includes(e.parameter), false);
            })

            assert.equal(Error.length, 3);
        }
    })
})