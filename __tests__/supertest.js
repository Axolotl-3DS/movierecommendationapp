const request = require('supertest');
const server = 'http://localhost:3000';

// tests movie APIs and routers
describe('Movie route integration', () => {

  /GET to movie router responds with a json obj
  describe('/api', () => {
    describe('GET', () => {
      xit('responds with 200 status and json content type', () => {
        return request(server)
          .get('/api')
          .expect('Content-Type', /json/)
          .expect(200);
      })
    });
  });

  // search button fuctionality
  describe('/api', () => {
    //post to server and response is a json obj
    describe('POST TO SEARCH', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .post('/api/search')
          .send({title: 'iron+man'})
          .expect('Content-Type', /json/)
          .expect(200);
      })
   });
  });

});

describe('Login', () => {

  // POST to login router responds with a json obj
  describe('/login', () => {
    describe('POST', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .get('/api')
          .expect('Content-Type', /json/)
          .expect(200);
      })
    });
  });

  // search button fuctionality
  describe('/api', () => {
    //post to server and response is a json obj
    describe('POST TO SEARCH', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .post('/login')
          .send({username: test, password:test'})
          .expect('Content-Type', /json/)
          .expect(200);
      })
   });
  });

});

