//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../apps/api/app');
var should = chai.should();
var shortid = require('shortid');

chai.use(chaiHttp);

//Datacontext
var config = require('../../config/config');
var readDataContext = require('../../repository/read-store/data-context')(config.readStore);
var writeDataContext = require('../../repository/blob-store/data-context')(config.blobStore);
readDataContext.sequelize.sync();
writeDataContext.sequelize.sync();

//Remove every data in database before do a test
describe("Clean Database", function() {
    it("Should clean all data", function(done){
        readDataContext.Category.destroy({where: {}}).then(function(effectedRow){
            console.log("Cleaned Category - Effected Row: ", effectedRow);
        });

        writeDataContext.Blob.destroy({where: {}}).then(function(effectedRow){
            console.log("Cleaned Blob - Effected Row: ", effectedRow);
        });
        
        done();
    })
})

describe("/GET categories", function(){
    it("Should receive all the categories", function(done){
        chai.request(server)
            .get("/categories")
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    })
})


describe("/POST categories - Post a valid categoryProps", function(){
    it("Should receive desired Category", function(done){
        var category = {
            id: shortid.generate(),
            name: "category 1"
        };
        
        chai.request(server)
            .post('/categories')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(category)
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.eql(category.id);
                res.body.name.should.be.eql(category.name);

                done();
            })
    })
})

describe("/POST categories - Post an invalid categoryProps", function(){
    it("Should receive 'Bad Request'", function(done){
        var category = {
            id: shortid.generate(),
            name: ""
        };
        
        chai.request(server)
            .post('/categories')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(category)
            .end(function(err, res){
                res.should.have.status(500);
                done();
            })
    })
})
