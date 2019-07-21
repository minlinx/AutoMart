import OrdersModel from '../models/order';
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
					return await response.status(201).json({
						status: 201,
						data
					});
				}
				else {
					return await response.status(404).json({
						status: 404,
						error: 'Not Found'
					});
				}
			} catch (error) {
				console.log(error);
				throw error;
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
				const carDatabaseResult = await OrdersModel.getAmoutFromOrdersTable(parsedOrderId);
				if (carDatabaseResult.rowCount > 0) {
					amount = carDatabaseResult.rows[0].amount;
					const orderDatabaseResult = await OrdersModel.changeOrderPrice(parsedPrice, parsedOrderId, parsedId);
					const { id, buyer, car_id, created_on, status } = { ...orderDatabaseResult.rows[0] };
					const data = { id, buyer, car_id, status, created_on, old_price_offered: amount, new_price_offered: parsedPrice };
					return await response.status(202).json({
						status: 202,
						data
					});
				}
				else {
					return await response.status(404).json({
						status: 404,
						error: 'Not Found'
					});
				}
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}
}
export default Orders;
