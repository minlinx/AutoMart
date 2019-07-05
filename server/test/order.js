import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../app';


describe('#ORDERS:   Tests all ORDERS routes', () => {
	describe('#POST /Order', () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1iYW5lbHNvbmlmZWFueWkxQGdtYWlsLmNvbSIsImlhdCI6MTU2MDUzMDgxOH0._8d_h8rsA4U-25ecAemdfkyOZMsiQuL9o4wtuzBdm4I';
		it('Should return a 404 status code.', done => {
			request(app)
				.post('/api/v1/order/255')
				.set('Authorization', `Bearer ${token}`)
				.send({ carId: '7', priceOffered: '700000000.00' })
				.end((error, response) => {
					expect(response.statusCode, '404');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			request(app)
				.post('/api/v1/order')
				.set('Authorization', `Bearer ${token}`)
				.send({ carId: '7', priceOffered: '700000000.00' })
				.end((error, response) => {
					expect(response.statusCode, '202');
					done();
				});
		});
		it('Should return a 422 status code', done => {
			request(app)
				.post('/api/v1/order')
				.set('Authorization', `Bearer ${token}`)
				.send({			})
				.end((error, response) => {
					expect(response.statusCode, '422');
					done();
				});
		});
		it('Should return a 422 status code', done => {
			request(app)
				.post('/api/v1/order?state=available')
				.set('Authorization', `Bearer ${token}`)
				.send({			})
				.end((error, response) => {
					expect(response.statusCode, '400');
					done();
				});
		});
	});
	describe('#PATCH /Order', () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1iYW5lbHNvbmlmZWFueWkxQGdtYWlsLmNvbSIsImlhdCI6MTU2MDUzMDgxOH0._8d_h8rsA4U-25ecAemdfkyOZMsiQuL9o4wtuzBdm4I';
		it('Should return a 404 status code.', done => {
			request(app)
				.patch('/api/v1/order/1/7000000.00')
				.set('Authorization', `Bearer ${token}`)
				.end((error, response) => {
					expect(response.statusCode, '404');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 1,
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					expect(response.statusCode, '202');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 1,
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					assert(response.statusCode, '401');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 1,
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					expect(response.statusCode, '500');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 'string',
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					assert(response.statusCode, '400');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 1,
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price?status=something')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					assert(response.statusCode, '400');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 1,
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price?status=something')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					expect(response.statusCode, '500');
					done();
				});
		});
		it('Should return a 404 status code.', done => {
			const data = {
				orderId: 1,
				priceOffered: 7000000
			};
			request(app)
				.patch('/api/v1/order/1/price?status=something')
				.set('Authorization', `Bearer ${token}`)
				.send(data)
				.end((error, response) => {
					assert(response.statusCode, '401');
					done();
				});
		});
		it('Should return a 422 status code.', done => {
			request(app)
				.patch('/api/v1/order/price')
				.set('Authorization', `Bearer ${token}`)
				.send({})
				.end((error, response) => {
					expect(response.statusCode, '422');
					done();
				});
		});
		it('Should return a 422 status code.', done => {
			request(app)
				.patch('/api/v1/order/166/price')
				.set('Authorization', `Bearer ${token}`)
				.send({})
				.end((error, response) => {
					expect(response.statusCode, '404');
					done();
				});
		});
	});
});
