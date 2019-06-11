import { assert } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../app';

describe('#POST /Order', () => {
	it('Should return a 404 status code.', done => {
		request(app)
			.post('/api/v1/order/255')
			.send({ carId: '7', priceOffered: '700000000.00' })
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 422 status code', done => {
		request(app)
			.post('/api/v1/order')
			.send({			})
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
describe('#PATCH /Order', () => {
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/order/1/7000000.00')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/order/1/ututuyuyuy')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/order/166/price')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
