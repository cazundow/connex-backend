const expect = require('chai').expect; 
const request = require('supertest'); 

const app = require('../app'); 

describe("It should return an object with a timestamp at process time", () => {
    it('ok, requesting a new dateimte workss', (done) => {
        request(app).get('/')
        .auth('', 'mysecrettoken')
        .send()
        .then((res) => {
            const body = res.body; 
            expect(body).to.contain.property('time'); 
            done()
        })
        .catch((err) => done(err))
    })


    it('ok, return some text', (done) => {
        request(app)
        .get('/metrics')
        .auth('', 'mysecrettoken')
        .expect('Content-Type', /text/)
        .expect(200, done)
        
    })

})