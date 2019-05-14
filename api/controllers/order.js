import carsDB from '../models/cars';
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
}
export default Orders;