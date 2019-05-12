import cars from '../models/cars';
class Cars {
    static allNewAvailableCars(request, response) {
        const {status, state} = request.query;
        const newAvailableCars =  cars.filter((car) => car.status === status && car.state === state);
        if (newAvailableCars.length > 0) {
            response.status(200).json({
                status: 200,
                data: newAvailableCars
            });
        }
        response.status(404).json({
            status: 404,
            message: 'Search Not Found'
        });
    }
}
export default Cars;