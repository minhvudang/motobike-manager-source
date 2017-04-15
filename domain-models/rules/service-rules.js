var validator = require('node-validator');

module.exports = validator.isAnyObject()
             .withRequired('name', validator.isString({ regex: /^.{1,14}$/ }))
             .withRequired('image', validator.isString({ regex: /^.{1,30}$/ }))
             .withRequired('price', validator.isInteger({min : 0}))
             .withRequired('type', validator.isString({ regex: /^.{1,20}$/ }))
             .withRequired('total', validator.isInteger({min : 0}))
             .withRequired('sale', validator.isInteger({min : 0}));