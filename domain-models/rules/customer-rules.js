var validator = require('node-validator');

module.exports = validator.isAnyObject()
                .withRequired('name', validator.isString({regex: /^.{1,14}$/}))
                .withRequired('produce', validator.isString({regex: /^.{1,30}$/}))
                .withRequired('motoType', validator.isString({regex: /^.{1,30}$/}))
                .withRequired('address', validator.isString({regex: /^.{1,30}$/}))
                .withRequired('phoneNumber', validator.isInteger());

                