import { assert } from 'chai';
import request from 'supertest';
import app from '../app';

describe('#Get /', () => {
    it('Should return a 200 status, if it is admin', done => {
      request(app)
        .get('/api/v1/car')
        .end((err, res) => {
          assert.equal(res.statusCode, '200');
          assert.isDefined(res.body);
          assert.isArray(res.body.data);
          done();
        });
    });
});
