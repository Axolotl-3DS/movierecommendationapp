const request = require('supertest');
const server = 'http://localhost:3000';
const dotenv = require('dotenv').config();
const db = `https://api.themoviedb.org/3/movie/299534/recommendations?api_key=${process.env.TMDB}&language=en-US&page=1`)


// tests movie APIs and routers
describe('Movie route integration', () => {

  //GET to movie router responds with a json obj
  describe('/api', () => {
    describe('GET', () => {
      it('responds with 200 status and json content type', () => {
        return request(server)
          .get('/api')
          .expect('Content-Type', /json/)
          .expect(200);
      })
  });
});
});

