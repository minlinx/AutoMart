import { validationResult } from 'express-validator/check';
import carsDB from '../models/cars';
import ordersDB from '../models/order';

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
		const orderToBeModified = ordersDB.find(
			order => order.id === parsedOrderId && order.status === 'pending'
		);
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
		if (orderToBeModified) {
			const data = { ...orderToBeModified, newPriceOffered: parsedPrice };
			response.status(202).json({
				status: 202,
				data
			});
		}
		response.status(404).json({
			status: 404,
			message: 'Not Found'
		});
	}
}
export default Orders;
