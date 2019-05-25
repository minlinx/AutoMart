import { validationResult } from 'express-validator/check';
import carsDB from '../models/cars';
import ordersDB from '../models/order';

class Orders {
	static createOrder(request, response) {
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
		if (errors.isEmpty() && oderedCar) {
			const data = { ...oderedCar, priceOffered: parsedPrice };
			response.status(201).json({
				status: 201,
				data
			});
		}
		response.status(404).json({
			status: 404,
			error: 'Not Found'
		});
	}
	static updateOrder(request, response) {
		const { orderId, price } = request.params;
		const parsedPrice = parseFloat(price);
		const parsedOrderId = parseInt(orderId);
		const OrderToUpdate = ordersDB.find(
			order => order.id === parsedOrderId && order.status === 'pending'
		);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (errors.isEmpty() && OrderToUpdate) {
			const data = { ...OrderToUpdate, newPriceOffered: parsedPrice };
			response.status(301).json({
				status: 301,
				data
			});
		}
		response.status(404).json({
			status: 404,
			error: 'Not Found'
		});
	}
}
export default Orders;
