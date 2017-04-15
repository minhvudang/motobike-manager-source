var validator = require('node-validator');

module.exports = validator.isAnyObject()
                .withRequired('userName', validator.isString({regex: /^.{5,30}$/}))
                .withRequired('password', validator.isString({regex: /^.{5,30}$/}))
                .withRequired('userType', validator.isString({regex: /(AGENCY|CUSTOMER)/}));