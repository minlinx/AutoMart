import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';
import Cars from '../../api/models/cars';

let token, car_id;
const userEmail = 'minaproblemsolver0987654321@gmail.com';
const userPassword = '0708@Automart';
describe('***Cars***', () => {
	const parsedId = 1, state = 'new', status = 'available', parsedPrice = 32000000, manufacturer = 'benz', model = 'benx-123', body_type = 'van';
	const parsedCarId = 12, min_price = 360000, max_price = 9000000;
	const img_url = 'https://res.cloudinary.com/min-automart/image/upload/v1563690211/min-automart-images/1563690206045g7.jpg.jpg';
	before(async () => {
		const response = await request(app)
			.post('/api/v1/auth/signin')
			.send({
				email: userEmail,
				password: userPassword
			});
		token = `Bearer ${response.body.data.token}`;
	});
	before(async () => {
		const createdAd = Cars.postCarAd(parsedId, state, status, parsedPrice, manufacturer, model, body_type, img_url);
		const patchedCarPrice = Cars.changeCarAdPrice(parsedPrice, parsedCarId, parsedId);
		const patchedCarstatus = Cars.changeCarAdStatus(parsedCarId, parsedId);
		const allCars = Cars.getAll();
		const getCarsWithinPriceRange = Cars.getCarsWithinPriceRange(status, min_price, max_price);
		const getCarsByState = Cars.getCarsByState(state);
		const getCarsByStatus = Cars.getCarsByStatus(status);
		const getCarsByStatusAndState = Cars.getCarsByStatusAndState(state, status);
		const getCarsByStatusAndManufacturer = Cars.getCarsByStatusAndManufacturer(manufacturer, status);
		const getCarsByBodyType = Cars.getCarsByBodyType(body_type);
		const getSpecficar = Cars.getSpecificCar(parsedCarId);
		const data = { createdAd, patchedCarPrice, allCars, getCarsByStatusAndState, getSpecficar, getCarsByStatusAndManufacturer, patchedCarstatus, getCarsWithinPriceRange, getCarsByBodyType, getCarsByState, getCarsByStatus  };
	});
	after(async () => {
		const deletedCar = Cars.deleteCarAd(car_id);
	});
	describe('# Post Car', () => {
		it('Should not add a car to the database because of query params', (done) => {
			request(app)
				.post('/api/v1/car?body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '400');
					done();
				});
		});
		it('Should return a 422 because of missing params', (done) => {
			request(app)
				.post('/api/v1/car')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '422');
					done();
				});
		});
	});
	describe('# Get Car', () => {
		it('Should return all cars in the database', (done) => {
			request(app)
				.get('/api/v1/car')
				.set({ Authorization: token })
				.end((error, response) => {
					car_id = response.body.data[(response.body.data.length - 1)].id;
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all cars in the specified price range.', (done) => {
			request(app)
				.get('/api/v1/car?min_price=250000&max_price=9000000&status=available')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all available new cars in the database', (done) => {
			request(app)
				.get('/api/v1/car?state=new&status=available')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all available used cars in the database', (done) => {
			request(app)
				.get('/api/v1/car?state=used&status=available')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all available cars in the database, by brand', (done) => {
			request(app)
				.get('/api/v1/car?manufacturer=bmw&status=available')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all used cars in the database', (done) => {
			request(app)
				.get('/api/v1/car?state=used')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all cars in the database, by body type', (done) => {
			request(app)
				.get('/api/v1/car?body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all cars in the database, by body type', (done) => {
			request(app)
				.get(`/api/v1/car/${ car_id }`)
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return all cars in the database, by body type', (done) => {
			request(app)
				.get('/api/v1/car?body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '200');
					done();
				});
		});
		it('Should return a 400 STATUS because of invalid path', (done) => {
			request(app)
				.get('/api/v1/car?min_price=250000&max_price=9000000&state=sold&manufacturer=bmw&body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '400');
					done();
				});
		});
		it('Post with query params', (done) => {
			request(app)
				.post('/api/v1/car?body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '400');
					done();
				});
		});
		it('Patch with query params', (done) => {
			request(app)
				.patch('/api/v1/car?body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
		it('Should return all cars in the database, by body type', (done) => {
			request(app)
				.put('/api/v1/car?body_type=van')
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
	});
	describe('# Patch Car', () => {
		it('Should return a 202 status code because of correct params', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/status`)
				.send({ status: 'sold' })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert(response.statusCode, '202');
					done();
				});
		});
		it('Should return a 422 status code because of missing params', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/status`)
				.set({ Authorization: token })
				// .send({ status: 'sold' })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '422');
					done();
				});
		});
		it('Should return a 401 status code because of missing token', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/status`)
				.send({ status: 'sold' })
				.set({ Authorization: 'ytytytytytyytyytyty' })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '401');
					done();
				});
		});
		it('Should modify the price of the specified car', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/price`)
				.set({ Authorization: token })
				.send({price: 3000000000})
				.end((error, response) => {
					assert.isDefined(response.body);
					assert(response.statusCode, '202');
					done();
				});
		});
		it('Should return a 422 status code because of missing params', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/price`)
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '422');
					done();
				});
		});
		it('Should return a 400 because the path contains query params', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/price?body_type=van`)
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '400');
					done();
				});
		});
		it('Should return a 401 status code because of missing token', (done) => {
			request(app)
				.patch(`/api/v1/car/${ car_id }/price`)
				.set({ Authorization: 'yryryryryyryryr' })
				.send({price: 3000000000})
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '401');
					done();
				});
		});
	});
	describe('# Delete Car', () => {
		it('Should return a 301 status code because car id is valid', (done) => {
			request(app)
				.delete(`/api/v1/car/${ car_id }`)
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '301');
					done();
				});
		});
		it('Should return a 401 status code because no token was provided', (done) => {
			request(app)
				.delete(`/api/v1/car/${ car_id }`)
				// .set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '401');
					done();
				});
		});
		it('Should return a 404 status code because car id is undefined', (done) => {
			request(app)
				.delete(`/api/v1/car/${ car_id }`)
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
	});
});
