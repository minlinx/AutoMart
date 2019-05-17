import carsDB from '../models/cars';
import ordersDB from '../models/order';
class Orders {
    static createOrder(request, response) {
        const { carId, priceOffered } = request.body;
        const parsedId = parseInt(carId);
        const parsedPrice = parseFloat(priceOffered);
        const oderedCar = carsDB.find((car) => car.id === parsedId);
        if (oderedCar) {
            const data = {...oderedCar, priceOffered:parsedPrice };
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
        const { orderId, price } = request.params;
        const parsedPrice = parseFloat(price);
        const parsedOrderId = parseInt(orderId);
        const arrayOfOrdersToUpdate = ordersDB
        .find((order) => order.id === parsedOrderId && order.status === 'pending');
        if (arrayOfOrdersToUpdate) {
            const data = {...arrayOfOrdersToUpdate, newPriceOffered: parsedPrice};
            response.status(301).json({
                status: 301,
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