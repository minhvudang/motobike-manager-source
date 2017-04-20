var chai = require('chai');
var assert = chai.assert;

var shortid = require('shortid');
var config = require('../config/config');

var DataContext = require('../repository/data-context');
var AgencyRepository = require('../repository/agency-repository');

var dataContext = DataContext(config.readStore);
var agencyRepository = new AgencyRepository(dataContext);

describe('Create new agency', function(){
    it('must persist success and correctly', function(done) {
        this.timeout(12000);

        dataContext.sequelize.sync().then(function() {
            var agencyObj = {
                id: shortid.generate(),
                name: 'Yamaha',
                avatar: '/1.jpg',
                address: 'Ha Noi',
                location: '105.85965095-20.9939911',
                phone: 965394786,
                tax: 'Ha Noi',
                rating: 3.14,
                description: 'bla bla bla',
                services: [{
                    id: shortid.generate(),
                    name: 'Thay dau',
                    image: '/3.jpg',
                    price: 300000,
                    type: 'normal',
                    total: 270000,
                    sale: 30
                }]
            }

            agencyRepository.save(agencyObj, function(err, agency){
                assert.equal(agency.id, agencyObj.id);

                done();
            })
        })
    })
})
