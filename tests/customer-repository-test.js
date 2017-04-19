var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');
var config = require('../config/config');

var DataContext = require('../repository/data-context');
var CustomerRepository = require('../repository/customer-repository');

var dataContext = DataContext(config.readStore);
var customerRepository = new CustomerRepository(dataContext);

describe('Create new agency', function(){
    it('must persist success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var customerObj = {
                id: shortid.generate(),
                name: 'Quang cho',
                produce: 'tau khua',
                motoType: 'wave',
                address: 'Bach Khoa',
                phoneNumber: 965394786,
                agencies: [{
                    id: 'B1kFvAzAx',
                    serviceIds: ["rylUD8mV0l"]
                }]
            }

            customerRepository.save(customerObj, function(err, customer){
                assert.equal(customer.id, customerObj.id);

                done();
            })
        })
    })
})
