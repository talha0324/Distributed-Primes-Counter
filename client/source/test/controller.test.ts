import chai from 'chai';
import chaiHttp from 'chai-http'
import app from '../code/index';
chai.use(chaiHttp);
chai.should();

describe("Controller", () => {
    it("should be able to received 200 from GET / call", (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
    it("should be able to received 200 from POST / call", (done) => {
        chai.request(app)
        .post('/')
        .send({from:10, until:20})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
    it("should be able to received 200 from POST / call", (done) => {
        chai.request(app)
        .post('/')
        .send({from:'abc', until:'xyz'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
    it("should be able to received 200 from POST / call", (done) => {
        chai.request(app)
        .post('/')
        .send({from:'20', until:'10'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
    it("should be able to received ERROR from POST / call", (done) => {
        chai.request(app)
        .post('/')
        .send({from:10, until:10})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    })
})