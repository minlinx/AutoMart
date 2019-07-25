import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';
import Orders from '../../api/models/order';

let token, parsedCarId, parsedOrderId;
const userEmail = 'minaproblemsolver0987654321@gmail.com';
const userPassword = '0708@Automart';
describe('***ORDERS***', () => {
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
		const getEverythingFromCarsTable = await Orders.getEverythingFromCarsTable();
		const lastCar = (getEverythingFromCarsTable.rows[getEverythingFromCarsTable.rowCount - 1]);
		parsedCarId = lastCar.id;
		let parsedId = lastCar.owner, parsedPrice = 5600000;
		const createOrder = await Orders.insertIntoDatabase(parsedCarId, parsedId, parsedPrice);
		const lastOrder = createOrder.rows[createOrder.rowCount - 1];
		parsedOrderId = lastOrder.id;
		const getPriceFromCarsTable = await Orders.getPriceFromCarsTable(parsedCarId);
		const getAmoutFromOrdersTable = await Orders.getAmoutFromOrdersTable(parsedOrderId);
		const changeOrderPrice = await Orders.changeOrderPrice(parsedPrice, parsedOrderId, parsedId);
		const data = { createOrder, getPriceFromCarsTable, getAmoutFromOrdersTable, changeOrderPrice };
	});
	after(async () => {
		const getEverythingFromCarsTable = await Orders.getEverythingFromCarsTable();
		const lastCar = (getEverythingFromCarsTable.rows[getEverythingFromCarsTable.rowCount - 1]);
		let parsedCarId = lastCar.id, parsedId = lastCar.owner, parsedPrice = 5600000, parsedOrderId;
		const createOrder = await Orders.insertIntoDatabase(parsedCarId, parsedId, parsedPrice);
		const lastOrder = createOrder.rows[createOrder.rowCount - 1];
		parsedOrderId = lastOrder.id;
		const deletedOrder = await Orders.deleteOrder(parsedOrderId);
		// console.log(deletedUser.rows[0].email);
	});
	describe('# Post Order', () => {
		it('Should return a 201 status code because of correct params', (done) => {
			request(app)
				.post('/api/v1/order')
				.send({ car_id: parsedCarId, amount: 5000000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '201');
					done();
				});
		});
		it('Should return a 400 status code because of query params', (done) => {
			request(app)
				.post('/api/v1/order?min_price=250000&body_type=van')
				.send({ car_id: parsedCarId, amount: 5000000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '400');
					done();
				});
		});
		it('Should return a 404 status code because of missing query params', (done) => {
			request(app)
				.post(`/api/v1/order/${ parsedOrderId }/price`)
				// .send({ car_id: parsedCarId, amount: 5000000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
	});
	describe('# Patch Order', () => {
		it('Should return a 202 status code because of correct params', (done) => {
			request(app)
				.patch(`/api/v1/order/${ parsedOrderId }/price`)
				.send({ price: 33700000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '202');
					done();
				});
		});
		it('Should return a 422 status code because of incorrect params', (done) => {
			request(app)
				.patch(`/api/v1/order/${ parsedOrderId }/price`)
				.send({ car_id: parsedCarId, amount: 5000000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '422');
					done();
				});
		});
		it('Should return a 404 status code because of invalid path', (done) => {
			request(app)
				.post(`/api/v1/order/${ parsedOrderId }/price`)
				.send({ price: 33700000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
		it('Should return a 401 because of invalid token', (done) => {
			request(app)
				.patch(`/api/v1/order/${ parsedOrderId }/price`)
				.send({ price: 33700000 })
				.set({ Authorization: 'tytytytyytyytytytyt' })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '401');
					done();
				});
		});
		it('Should return a 404 status code because of query params', (done) => {
			request(app)
				.patch('/api/v1/order?min_price=250000&body_type=van')
				.send({ car_id: parsedCarId, amount: 5000000 })
				.set({ Authorization: 'tytytytyytyytytytyt' })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
	});
});
