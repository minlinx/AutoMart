import OrdersModel from '../models/order';
import serverResponse from '../../helpers/serverResponse';
class Orders {
	static async createOrder(request, response, next) {
		let price;
		const userId = request.user.id;
		const parsedId = Number(userId);
		const token = request.token || request.headers.token;
		const { car_id, amount } = request.body;
		const parsedCarId = Number(car_id);
		const parsedPrice = Number(amount);
		if (
			parsedCarId && parsedPrice && parsedId && token
		) {
			try {
				const carDatabaseResult = await OrdersModel.getPriceFromCarsTable(parsedCarId);
				if (carDatabaseResult.rowCount > 0) {
					price = carDatabaseResult.rows[0].price;
					const orderDatabaseResult = await OrdersModel.insertIntoDatabase(parsedCarId, parsedId, parsedPrice);
					const { id, buyer, created_on, status } = { ...orderDatabaseResult.rows[0] };
					const data = { id, buyer, car_id, status, created_on, price, price_offered: parsedPrice };
					serverResponse(request, response, 201, Object.assign(data));
				}
				else {
					serverResponse(request, response, 404);
				}
			} catch (error) {
				return await next();
			}
		}
	}
	static async updateOrder(request, response, next) {
		const token = request.token || request.headers.token;
		const { price } = request.body;
		const userId = request.user.id;
		const parsedId = Number(userId);
		const { order_id } = request.params;
		const parsedPrice = Number(price);
		const parsedOrderId = Number(order_id);
		let amount;
		if (
			parsedId && token && parsedPrice && parsedOrderId
		) {
			try {
				const carDatabaseResult = await OrdersModel.getAmoutFromOrdersTable(parsedOrderId, parsedId);
				if (carDatabaseResult.rowCount > 0) {
					amount = carDatabaseResult.rows[0].amount;
					const orderDatabaseResult = await OrdersModel.changeOrderPrice(parsedPrice, parsedOrderId, parsedId);
					console.log('From Update Order', orderDatabaseResult.rows);
					const { id, buyer, car_id, created_on, status } = { ...orderDatabaseResult.rows[0] };
					const data = { id, buyer, car_id, status, created_on, old_price_offered: amount, new_price_offered: parsedPrice };
					serverResponse(request, response, 202, Object.assign(data));
				}
				else {
					serverResponse(request, response, 404);
				}
			} catch (error) {
				return await next();
			}
		}
	}
	static async specificOrder(request, response, next) {
		const token = request.token || request.headers.token;
		const { order_id } = request.params;
		const parsedCarId = Number(order_id);
		if (parsedCarId && token) {
			try {
				const carDatabaseResult = await OrdersModel.getSpecificOrder(parsedCarId);
				if (carDatabaseResult.rowCount > 0) {
					const data = { ...carDatabaseResult.rows[0] };
					serverResponse(request, response, 200, Object.assign(data));
				}
				else {
					serverResponse(request, response, 404);
				}
			} catch (error) {
				return await next();
			}
		}
	}
}
export default Orders;
