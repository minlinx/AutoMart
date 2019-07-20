import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';

class Orders {
	static async createOrder(request, response, next) {
		let price;
		const id = request.user.id;
		const parsedId = Number(id);
		const token = request.token || request.headers.token;
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { car_id, amount } = request.body;
		const parsedCarId = Number(car_id);
		const parsedPrice = Number(amount);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			car_id && id && token
		) {
			await pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(async () => {
					const sql = 'SELECT price FROM cars WHERE id=$1';
					const param = [parsedCarId];
					return await pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(async (result) => {
					price = result.rows[0].price;
					const createdOn = new Date();
					const sql = 'INSERT INTO orders(buyer, car_id, amount, status, created_on) VALUES ($2, $1, $5, $3, $4) RETURNING *';
					const params = [parsedCarId, parsedId, 'pending', createdOn, parsedPrice];
					return await pool.query(sql, params);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(async (result) => {
					if (!result.rowCount > 0) {
						return await response.status(404).json({
							status: 404,
							error: 'Not Found',
						});
					}
					else {
						const { id, car_id, created_on, status } = result.rows[0];
						const data = { id, car_id, created_on, status, price, price_Offered: parsedPrice, token };
						return await response.status(201).json({
							status: 201,
							data
						});
					}
				}).catch((error) => next(error));
		}
		else {
			return await response.status(400).json({
				status: 400,
				error: 'Bad request'
			});
		}
	}
	static async updateOrder(request, response, next) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const token = request.token || request.headers.token;
		const { price } = request.body;
		const id = request.user.id;
		const parsedId = Number(id);
		const { order_id } = request.params;
		const parsedPrice = Number(price);
		const parsedOrderId = Number(order_id);
		let amount;
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			parsedId && token && order_id
		) {
			await pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(async() => {
					const sql = 'SELECT amount FROM orders WHERE id=$1 AND buyer=$2';
					const param = [parsedOrderId, parsedId];
					return await pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(async (result) => {
					if (!result.rowCount > 0) {
						return await response.status(400).json({
							status: 400,
							error: 'Bad Request'
						});
					}
					else {
						amount = result.rows[0].amount;
						const sql = 'UPDATE orders SET amount=$2 WHERE (id=$1 AND status=$3) RETURNING *';
						const params = [parsedOrderId, parsedPrice, 'pending'];
						return await pool.query(sql, params);
					}
				}).catch((error) => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'Server is Down'
						});
					}
				}).then(async (result) => {
					if (!result.rowCount > 0) {
						return await response.status(404).json({
							status: 404,
							error: 'Not Found',
						});
					}
					else {
						const { id, car_id, status } = result.rows[0];
						const data = { id, car_id, status, old_price_offered: amount, new_price_offered: parsedPrice, token };
						return await response.status(202).json({
							status: 202,
							data
						});
					}
				}).catch((error) => next(error));
		}
		else {
			return await response.status(400).json({
				status: 400,
				error: '*Check Your Inputs*'
			});
		}
	}
}
export default Orders;
