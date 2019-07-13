import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';

class Orders {
	static createOrder(request, response) {
		const { id } = response.locals;
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { token, car_id, amount } = request.body;
		const parsedId = parseInt(car_id);
		const parsedPrice = parseFloat(amount);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			errors.isEmpty() && token
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const createdOn = new Date();
					const sql = 'INSERT INTO orders(buyer, car_id, amount, status, created_on) VALUES ((SELECT id FROM users WHERE id=$2), (SELECT id FROM cars  WHERE id=$1), (SELECT price FROM cars  WHERE id=$1), $3, $4) RETURNING *';
					const params = [parsedId, id, 'pending', createdOn];
					return pool.query(sql, params);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(result => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							message: 'Not Found',
						});
					}
					else {
						const { id, car_id, created_on, status, amount } = result.rows[0];
						const data = { id, car_id, created_on, status, price: amount, price_Offered: parsedPrice, token };
						return response.status(201).json({
							status: 201,
							data
						});
					}
				});
		}
	}
	static updateOrder(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { price, token } = request.body;
		const { email } = response.locals;
		// const confirmedUser = userEmail === email;
		const { order_id } = request.params;
		const parsedPrice = parseFloat(price);
		const parsedOrderId = parseInt(order_id);
		let amount;
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		else if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			errors.isEmpty() && token
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'SELECT amount FROM orders WHERE id=$1 AND buyer=(SELECT id FROM users WHERE email=$2)';
					const param = [parsedOrderId, email];
					return pool.query(sql, param);
				})
				.catch(error => {
					console.log('from here', error);
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(result => {
					console.log(result);
					if (!result.rowCount > 0) {
						response.status(401).json({
							status: 401,
							error: 'Unauthorized'
						});
					}
					else {
						amount = result.rows[0].amount;
						const sql = 'UPDATE orders SET amount=$2 WHERE (id=$1 AND status=$3) RETURNING *';
						const params = [parsedOrderId, parsedPrice, 'pending'];
						return pool.query(sql, params);
					}
				}).catch((error) => {
					console.log(error);
					if (error) {
						response.status(500).json({
							status: 500,
							error: 'Server is Down'
						});
					}
				}).then((result) => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							message: 'Not Found',
						});
					}
					else {
						const { id, car_id, status } = result.rows[0];
						const data = { id, car_id, status, old_price_offered: amount, new_price_offered: parsedPrice, token };
						return response.status(202).json({
							status: 202,
							data
						});
					}
				});
		}
		else {
			response.status(400).json({
				status: 400,
				error: '*Check Your Inputs*'
			});
		}
	}
}
export default Orders;
