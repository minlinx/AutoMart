import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../app';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1iYW5lbHNvbmlmZWFueWkxQGdtYWlsLmNvbSIsImlhdCI6MTU2MDUzMDgxOH0._8d_h8rsA4U-25ecAemdfkyOZMsiQuL9o4wtuzBdm4I';
describe('#POST /Order', () => {
	it('Should return a 404 status code.', done => {
		request(app)
			.post('/api/v1/order/255')
			.set('Authorization', 'Bearer ' + token)
			.send({ carId: '7', priceOffered: '700000000.00' })
			.end((error, response) => {
				expect(response.statusCode, '401');
				done();
			});
	});
	it('Should return a 422 status code', done => {
		request(app)
			.post('/api/v1/order')
			.set('Authorization', 'Bearer ' + token)
			.send({			})
			.end((error, response) => {
				assert.equal(response.statusCode, '401');
				done();
			});
	});
});
describe('#PATCH /Order', () => {
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/order/1/7000000.00')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/order/1/ututuyuyuy')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/order/166/price')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert.equal(response.statusCode, '401');
				done();
			});
	});
});
