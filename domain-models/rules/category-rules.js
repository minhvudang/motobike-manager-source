var validator = require('node-validator');

module.exports = validator.isAnyObject()
                .withRequired('name', validator.isString({regex: /^.{5,30}$/}));