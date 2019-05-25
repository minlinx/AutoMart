import { assert } from 'chai';
import request from 'supertest';
import app from '../app';

describe('#GET /', () => {
	it('Should return a 200 status, if it is admin', done => {
		request(app)
			.get('/api/v1/car')
			.end((error, response) => {
				assert.equal(response.statusCode, '200');
				done();
			});
	});
	it('Should return a 200 status', done => {
		request(app)
			.get('/api/v1/car/3')
			.end((error, response) => {
				assert.equal(response.statusCode, '200');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.get('/api/v1/car/20')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
});
describe('#POST /', () => {
	it('Should return a 201 status code.', done => {
		request(app)
			.post('/api/v1/car')
			.set({
				owner: 'Mba Ifeanyi',
				email: 'minaproblemsolver@gmail.com',
				createdOn: '18-05-2015',
				price: '280000.00',
				status: 'available',
				manufacturer: 'benz',
				model: '8888888888888888',
				bodyType: 'car',
				carImage: 'car image'
			})
			.end((error, response) => {
				assert.equal(response.statusCode, '201');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.post('/api/v1/car')
			.set({
				owner: 'Mba Ifeanyi',
				email: 'minaproblemsolver@gmail.com',
				status: 'available',
				manufacturer: 'benz',
				model: '8888888888888888',
				bodyType: 'car',
				carImage: 'car image'
			})
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
describe('#DELETE /', () => {
	it('Should return a 301 status code.', done => {
		request(app)
			.delete('/api/v1/car/1')
			.end((error, response) => {
				assert.equal(response.statusCode, '301');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.delete('/api/v1/car/20')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
});
describe('#PATCH /', () => {
	it('Should return a 202 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/7000000.00')
			.end((error, response) => {
				assert.equal(response.statusCode, '202');
				done();
			});
	});
	it('Should return a 202 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/available')
			.end((error, response) => {
				assert.equal(response.statusCode, '202');
				done();
			});
	});
	it('Should return a 202 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/sold')
			.end((error, response) => {
				assert.equal(response.statusCode, '202');
				done();
			});
	});
	it('Should return a 400 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/yytyytytyyty7776777')
			.end((error, response) => {
				assert.equal(response.statusCode, '400');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/car/yyy/yytyytytyyty7776777')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
