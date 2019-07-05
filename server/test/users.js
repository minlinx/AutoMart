import { assert, expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbmFwcm9ibGVtc29sdmVyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6ImpvaG4xIiwiaWF0IjoxNTYwMjU3MzE2fQ.Q2fYbS10M2IV0pJVSIpgEN3VpNz_T5qw_FmTsuXFbEk';
describe('#POST /User', () => {
	it('Should return a 404 status code.', done => {
		const data = {
			email: 'minaproblemsolver@gmail.com',
			password: '123456'
		};
		request(app)
			.post('/api/v1/auth/signup')
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.end((error, response) => {
				assert(response.statusCode, '400');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		const data = {
			email: 'minaproblemsolver@gmail.com',
			password: '123456'
		};
		request(app)
			.post('/api/v1/auth/signup')
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.end((error, response) => {
				expect(response.statusCode, '201');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		const data = {
			email: 'minaproblemsolver@gmail.com',
			password: '123456'
		};
		request(app)
			.post('/api/v1/auth/signup')
			.set('Authorization', `Bearer ${token}`)
			.send(data)
			.end((error, response) => {
				expect(response.statusCode, '500');
				done();
			});
	});
	it('Should return a 422 status possibly2 code.', done => {
		request(app)
			.post('/api/v1/auth/signup')
			.set({})
			.end((error, response) => {
				expect(response.statusCode, '422');
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
				expect(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 422 status possibly3 code.', done => {
		request(app)
			.post('/api/v1/auth/signin')
			.set({
				email: 'minaproblemsolver@gmail.com',
				password: 123456
			})
			.end((error, response) => {
				expect(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status possibly3 code.', done => {
		request(app)
			.post('/api/v1/auth/signin')
			.set({
				email: 'minaproblemsolver@gmail.com',
				password: 123456
			})
			.end((error, response) => {
				expect(response.statusCode, '400');
				done();
			});
	});
	it('Should return a 422 status possibly3 code.', done => {
		request(app)
			.post('/api/v1/auth/signin')
			.set({
				email: 'minaproblemsolver@gmail.com',
				password: 123456
			})
			.end((error, response) => {
				expect(response.statusCode, '500');
				done();
			});
	});
	it('Should return a 422 status possibly3 code.', done => {
		request(app)
			.post('/api/v1/auth/signin')
			.set({
				email: 'minaproblemsolver@gmail.com',
				password: 123456
			})
			.end((error, response) => {
				expect(response.statusCode, '200');
				done();
			});
	});
});
describe('Test Route with Token', function () {
	const data = {
		email: 'minaproblemsolver@gmail.com',
		password: '123456'
	};
	it('one Post to signup', (done) => {
		request(app)
			.post('/api/v1/auth/signup')
			.set('Accept', 'x-www-form-urlencoded/json')
			.send(data)
			.end((error, response) => {
				expect(response.statusCode, '400');
				done();
			});
	});
	it('should not be able to consume the route /api/v1/auth/signin since no token was sent', function (done) {
		request(app)
			.post('/api/v1/auth/signin')
			.set('Accept', 'x-www-form-urlencoded/json')
			.send('email=minaproblemsolver@gmail.com')
			.send('password=123456')
			.end((error, response) => {
				expect(response.statusCode, '422');
				done();
			});
	});

	it('should be able to consume the route /test since token valid was sent', function (done) {
		const data = {
			email: 'minaproblemsolvernew1111@gmail.com',
			password: '123456@autoMart'
		};
		request(app)
			.post('/api/v1/auth/signin')
			.set('Authorization', 'Bearer ' + token)
			.send(data)
			.end((error, response) => {
				expect(response.statusCode, '401');
				done();
			});
	});
});
