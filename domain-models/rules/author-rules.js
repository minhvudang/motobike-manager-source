var validator = require('node-validator');

module.exports = validator.isAnyObject()
             .withRequired('name', validator.isString({ regex: /^.{4,30}$/ }))
             .withRequired('title', validator.isString({ regex: /^.{4,30}$/ }))
             .withRequired('description', validator.isString({ regex: /^.{15,300}$/ }))
             .withRequired('avatar', validator.isString({ regex: /^.+$/ }));