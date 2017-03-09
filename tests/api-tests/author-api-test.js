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
        readDataContext.Author.destroy({where: {}}).then(function(effectedRow){
            console.log("Cleaned Author - Effected Row: ", effectedRow);
        });
        writeDataContext.Blob.destroy({where: {}}).then(function(effectedRow){
            console.log("Cleaned Blob - Effected Row: ", effectedRow);
        });
        
        done();
    })
})

describe("/GET authors", function(){
    it("Should receive all the authors", function(done){
        chai.request(server)
            .get("/authors")
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            })
    })
})

describe("GET authors/:authorId - Get exist Author", function(){
    it("Should receive desired Author", function (done){
        var author = {
            id: shortid.generate(),
            name: "author 1",
            title: "title 1",
            description: "just a test for description"
        };

        readDataContext.Author.create(author);

        chai.request(server)
            .get('/authors/' + author.id)
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.eql(author.id);
                res.body.name.should.be.eql(author.name);
                res.body.title.should.be.eql(author.title);
                res.body.description.should.be.eql(author.description);

                done();
            })
    })
})

describe("GET authors/:authorId - Get not exist Author", function(){
    it("Should receive 'Not Found'", function (done){
        id = "not_exist_0001"; 
        chai.request(server)
            .get('/authors/' + id)
            .end(function(err, res){
                res.should.have.status(404);
                res.body.msg.should.eql('Not Found');
                done();
            })
    })
})

describe("/POST authors - Post a valid authorProps", function(){
    it("Should receive desired Author", function(done){
        var author = {
            id: shortid.generate(),
            name: "author 1",
            title: "title 1",
            description: "just a test for description"
        };
        
        chai.request(server)
            .post('/authors')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(author)
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.eql(author.id);
                res.body.name.should.be.eql(author.name);
                res.body.title.should.be.eql(author.title);
                res.body.description.should.be.eql(author.description);

                done();
            })
    })
})

describe("/POST authors - Post an invalid authorProps", function(){
    it("Should receive 'Bad Request'", function(done){
        var author = {
            id: shortid.generate(),
            name: "",
            title: "",
            description: ""
        };
        
        chai.request(server)
            .post('/authors')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(author)
            .end(function(err, res){
                res.should.have.status(500);
                done();
            })
    })
})

describe("PUT authors/:authorId - Update exist Author", function(){
    it("Should receive updated Author", function (done){
        var author = {
            id: shortid.generate(),
            name: "author 1",
            title: "title 1",
            description: "just a test for description"
        };
        var updateAuthorProps = {
            name: "author 2",
            title: "title 2",
            description: "the description had been fixed"
        }
        //write to BlobDB
        chai.request(server)
            .post('/authors')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(author)
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.id.should.be.eql(author.id);
                res.body.name.should.be.eql(author.name);
                res.body.title.should.be.eql(author.title);
                res.body.description.should.be.eql(author.description);

                //update from BlobDB
                chai.request(server)
                    .put('/authors/' + author.id)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(updateAuthorProps)
                    .end(function(err, res){
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.id.should.be.eql(author.id);
                        res.body.name.should.be.eql(updateAuthorProps.name);
                        res.body.title.should.be.eql(updateAuthorProps.title);
                        res.body.description.should.be.eql(updateAuthorProps.description);

                        done();
                    })
            });
    
    })
})


describe("PUT authors/:authorId - Update not exist Author", function(){
    it("Should receive 'Request Failed'", function (done){
        var id = "not_exist_0001";
        var updateAuthorProps = {
            name: "author 2",
            title: "title 2",
            description: "the description had been fixed"
        }

        chai.request(server)
            .put('/authors/' + id)
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(updateAuthorProps)
            .end(function(err, res){
                res.should.have.status(500);
                done();
            })
    
    })
})