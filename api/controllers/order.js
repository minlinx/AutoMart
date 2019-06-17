import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';
import carsDB from '../models/cars';

class Orders {
	static createOrder(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { carId, priceOffered } = request.body;
		const parsedId = parseInt(carId);
		const parsedPrice = parseFloat(priceOffered);
		const oderedCar = carsDB.find(car => car.id === parsedId);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (oderedCar) {
			const data = { ...oderedCar, priceOffered: parsedPrice };
			response.status(201).json({
				status: 201,
				data
			});
		}
		response.status(404).json({
			status: 404,
			message: 'Not Found'
		});
	}
	static updateOrder(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { priceOffered } = request.body;
		const { orderId } = request.params;
		const parsedPrice = parseFloat(priceOffered);
		const parsedOrderId = parseInt(orderId);
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
			errors.isEmpty()
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then(() => {
					const sql = 'UPDATE orders SET amount=$1 WHERE (id=$2 AND status=$3)';
					const params = [parsedPrice, parsedOrderId, 'pending'];
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
						return response.status(202).json({
							status: 202,
							message: 'Request accepted!'
						});
					}
				});
		}
		else {
			response.status(400).json({
				status: 400,
				error: 'You can only mark car AD as sold'
			});
		}
	}
}
export default Orders;
