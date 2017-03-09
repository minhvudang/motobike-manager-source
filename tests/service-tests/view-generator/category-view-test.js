var chai = require('chai');
var assert = chai.assert;

var Category = require('../../../domain-models/category')
var CategroyEvents = require('../../../domain-models/events/category-events');
;

var config = require('../../../config/config');
var CategoryViewGenerator = require('../../../services/view-generators/category-view');
var DataContext = require('../../../repository/read-store/data-context');
var CategoryRepository = require('../../../repository/read-store/category-repository');

var dataContext = DataContext(config.readStore);
var categoryRepository = new CategoryRepository(dataContext);
var categoryViewGenerator = new CategoryViewGenerator(categoryRepository);

describe('Create new Category', function(){
    it('persist success and correctly', function(done) {
        this.timeout(12000);

        var category = new Category({
            name: 'Chapter 1'
        })

        var categoryCreatedEvent = {
            type: CategoryEvents.CATEGORY_CREATED,
            data: category
        }

        dataContext.sequelize.sync().then(function() {
            categoryViewGenerator.handler(categoryCreatedEvent, function(err, result) {
                authorRepository.findById(category.id, [], function(err, result) {
                    assert.equal(result.id, category.id);
                    assert.equal(result.name, category.name);

                    done();
                })
            })
        })
    })
})