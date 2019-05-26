import { assert } from 'chai';
import request from 'supertest';
import app from '../app';

describe('#POST /Order', () => {
 bg-api-test-166255626
=======
	// it('Should return a 201 status code.', done => {
	// 	request(app)
	// 		.post('/api/v1/order')
	// 		.set({ carId: '7', priceOffered: '700000000.00' })
	// 		.end((error, response) => {
	// 			assert.equal(response.statusCode, '201');
	// 			done();
	// 		});
	// });
 develop
	it('Should return a 422 status code.', done => {
		request(app)
			.post('/api/v1/order')
			.set({			})
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
describe('#PATCH /Order', () => {
	it('Should return a 301 status code.', done => {
		request(app)
			.patch('/api/v1/order/1/7000000.00')
			.end((error, response) => {
				assert.equal(response.statusCode, '301');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/order/1/ututuyuyuy')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/order/166/700000.00')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
});
