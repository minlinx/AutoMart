import { assert, expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';
import Cars from '../../api/controllers/cars';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1iYW5lbHNvbmlmZWFueWkxQGdtYWlsLmNvbSIsImlhdCI6MTU2MDUzMDgxOH0._8d_h8rsA4U-25ecAemdfkyOZMsiQuL9o4wtuzBdm4I';
describe('#GET /Car', () => {
	it('Should return a 422 status', done => {
		const data = {
			status: 'available',
			token
		};
		request(app)
			.get('/api/v1/car')
			.set('Authorization', 'Bearer ' + token)
			.send(data)
			.end((error, response) => {
				expect(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status', done => {
		request(app)
			.get('/api/v1/car?minPrice=160000.00&maxPrice=250000.00&status=available&state=new')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status, if it is admin', done => {
		request(app)
			.get('/api/v1/car?minPrice=160000.00&maxPrice=250000.00&status=available')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status', done => {
		request(app)
			.get('/api/v1/car/3')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.get('/api/v1/car/20')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 400 status code.', done => {
		request(app)
			.get('/api/v1/car/3?state=new')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?state=new')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&bodyType=car')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&manufacturer=benz')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=availa777ble&state=used')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 422 status code.', done => {
		request(app)
			.get('/api/v1/car?status=available&manufacturer=benz&bodyType=car')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 200 status code.', done => {
		request(app)
			.get('/api/v1/car?state=used')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.get('/api/v1/car?state=newyyyyy')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
});
describe('#POST /Car', () => {
	it('Should return a 422 status code.', done => {
		request(app)
			.post('/api/v1/car')
			.set('Authorization', 'Bearer ' + token)
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
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 501 status code.', done => {
		request(app)
			.post('/api/v1/car')
			.set('Authorization', 'Bearer ' + token)
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
				assert(response.statusCode, '422');
				done();
			});
	});
});
describe('#DELETE /Car', () => {
	it('Should return a 301 status code.', done => {
		request(app)
			.delete('/api/v1/car/1')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.delete('/api/v1/car/20')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
});
describe('#PATCH /Car', () => {
	it('Should return a 422 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/price')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 202 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/price')
			.set('Authorization', 'Bearer ' + token)
			.send({
				price: 7000000
			})
			.end((error, response) => {
				assert(response.statusCode, '422');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/sold')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/yytyytytyyty7776777')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '404');
				done();
			});
	});
	it('Should return a 404 status code.', done => {
		request(app)
			.patch('/api/v1/car/1/yytyytytyyty7776777')
			.set('Authorization', 'Bearer ' + token)
			.end((error, response) => {
				assert(response.statusCode, '404');
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
