import carsDB from '../models/cars';
const cars = (request, response) => {
    const {status, state} = request.query;
    if (status && state) {
        const newAvailableCars =  carsDB.filter((car) => car.status === status && car.state === state);
        response.status(200).json({
            status: 200,
            data: newAvailableCars
        });
    }
    else if (status) {
        const availableCars =  carsDB.filter((car) => car.status === status);
        return response.status(200).json({
            status: 200,
            data: availableCars
        });
    }
    response.status(404).json({
        status: 404,
        message: 'Search Not Found'
    });
};
export default cars;