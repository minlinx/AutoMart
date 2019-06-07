import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';

describe('#POST /User', () => {
	it('Should return a 422 status code.', done => {
		const data = {
			email: 'minaproblemsolver@gmail.com',
			password: '123456'
		};
		request(app)
			.post('/api/v1/auth/signup')
			.send(data)
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.post('/api/v1/auth/signup')
			.send({
				email: 'minaproblemsolver@gmail.com',
				password: '8888888888888888',
			})
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.post('/api/v1/auth/signup/8999')
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
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.post('/api/v1/auth/signin')
			.set({
				email: 'minaproblemsolver@gmail.com',
				password: 123456
			})
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
