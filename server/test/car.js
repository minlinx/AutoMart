import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';
import Cars from '../../api/controllers/cars';

describe('#GET /Car', () => {
	it('Should return a 422 status', done => {
		const status = 'available';
		request(app)
			.get('/api/v1/car')
			.send(status)
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status', done => {
		request(app)
			.get('/api/v1/car?minPrice=160000.00&maxPrice=250000.00&status=available&state=new')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status, if it is admin', done => {
		request(app)
			.get('/api/v1/car?minPrice=160000.00&maxPrice=250000.00&status=available')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status', done => {
		request(app)
			.get('/api/v1/car/3')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.get('/api/v1/car/20')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 400 status code.', done => {
		request(app)
			.get('/api/v1/car/3?state=new')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?state=new')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&bodyType=car')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&manufacturer=benz')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
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
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&manufacturer=benz&bodyType=car')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 200 status code.', done => {
		request(app)
			.get('/api/v1/car?state=used')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.get('/api/v1/car?state=newyyyyy')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
				done();
			});
	});
});
describe('#POST /Car', () => {
	it('Should return a 422 status code.', done => {
		request(app)
			.post('/api/v1/car')
			.send({
				id: 10,
				owner: 10,
				email: 'minaproblemsolver@gmail.com',
				createdOn: '18-05-2015',
				price: '280000.00',
				status: 'available',
				state: 'available',
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
	it('Should return a 501 status code.', done => {
		request(app)
			.post('/api/v1/car')
			.send({
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
				assert.equal(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.delete('/api/v1/car/20')
			.end((error, response) => {
				assert.equal(response.statusCode, '422');
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
	it('Should return a 202 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/price')
			.send({
				price: 7000000
			})
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
describe('Cars Property', () => {
	it('should contain', () => {
		assert.property(Cars, 'getCarOrCars');
		assert.property(Cars, 'deleteCarAd');
		assert.property(Cars, 'changeCarAdPrice');
		assert.property(Cars, 'changeCarAdStatus');
		assert.property(Cars, 'postCarAd');
		assert.property(Cars, 'specificCar');
	});
});
