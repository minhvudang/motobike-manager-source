var validator = require('node-validator');

module.exports = validator.isAnyObject()
                .withRequired('name', validator.isString({regex: /^.{1,14}$/}))
                .withRequired('avatar', validator.isString({regex: /^.{1,30}$/}))
                .withRequired('address', validator.isString({regex: /^.{1,20}$/}))
                .withRequired('location', validator.isString({regex: /^.{1,50}$/}))
                .withRequired('phone', validator.isInteger())
                .withRequired('tax', validator.isString({regex: /^.{1,20}$/}))
                .withRequired('rating', validator.isNumber())
                .withRequired('description', validator.isString({regex: /^.{1,20}$/}));

                