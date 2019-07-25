import { assert } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../app';
import Orders from '../../api/models/order';
import Flags from '../../api/models/flags';

let token, parsedCarId, reason, description;
const userEmail = 'minaproblemsolver0987654321@gmail.com';
const userPassword = '0708@Automart';
describe('***FLAGS***', () => {
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
		reason = 'Vehicle is not affordable';
		description = 'Compared vehicle-price on other sites and found out Vehicle is not affordable';
		const postFlag = await Flags.postFlag(parsedCarId, reason, description);
	});
	describe('# Post Order', () => {
		it('Should return a 201 status code because of correct params', (done) => {
			request(app)
				.post('/api/v1/flag')
				.send({ car_id: parsedCarId, reason, description })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '201');
					done();
				});
		});
		it('Should return a 400 status code because of query params', (done) => {
			request(app)
				.post('/api/v1/flag?min_price=250000&body_type=van')
				.send({ car_id: parsedCarId, reason, description })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '400');
					done();
				});
		});
		it('Should return a 404 status code because of missing query params', (done) => {
			request(app)
				.post(`/api/v1/flag/${ parsedCarId }/price`)
				// .send({ car_id: parsedCarId, amount: 5000000 })
				.set({ Authorization: token })
				.end((error, response) => {
					assert.isDefined(response.body);
					assert.equal(response.statusCode, '404');
					done();
				});
		});
	});
});
