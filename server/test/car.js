import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';


describe('#GET /Car', () => {
	it('Should return a 200 status', done => {
		const status = 'available';
		request(app)
			.get('/api/v1/car/status')
			.send(status)
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 200 status', done => {
		request(app)
			.get('/api/v1/car/statusAndState')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
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
	it('Should return a 200 status code.', done => {
		request(app)
			.get('/api/v1/car?minPrice=160000.00&maxPrice=250000.00&status=available')
			.end((error, response) => {
				assert.equal(response.statusCode, '200');
				done();
			});
	});
	it('Should return a 200 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&state=used')
			.end((error, response) => {
				assert.equal(response.statusCode, '200');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=availa777ble&state=used')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 400 status code.', done => {
		request(app)
			.get('/api/v1/car?minPrice=160000.00&maxPrice=250000.00&status=available&state=used')
			.end((error, response) => {
				assert.equal(response.statusCode, '400');
				done();
			});
	});
	it('Should return a 200 status code.', done => {
		request(app)
			.get('/api/v1/car?state=used')
			.end((error, response) => {
				assert.equal(response.statusCode, '200');
				done();
			});
	});
});
describe('#POST /Car', () => {
	it('Should return a 422 status code.', done => {
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
				assert.equal(response.statusCode, '422');
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
describe('#DELETE /Car', () => {
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
describe('#PATCH /Car', () => {
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/price')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/status')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/sold')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/yytyytytyyty7776777')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/yytyytytyyty7776777')
			.end((error, response) => {
				assert.equal(response.statusCode, '404');
				done();
			});
	});
});
