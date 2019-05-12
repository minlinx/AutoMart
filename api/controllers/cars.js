import carsDB from '../models/cars';
import users from '../models/users';
const admin = users.filter((user) => user.isAdmin === true);
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
    else if (admin) {
        return response.status(200).json({
            status: 200,
            data: carsDB
        });
    }
    response.status(404).json({
        status: 404,
        message: 'Search Not Found'
    });
};
export default cars;