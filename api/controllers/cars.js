import { validationResult  } from 'express-validator/check';
import carsDB from '../models/cars';
import users from '../models/users';
const admin = users.filter((user) => user.isAdmin === true);
class Cars {
    static cars(request, response) {
        const errors = validationResult(request);
        const {status, state, minPrice, maxPrice} = request.query;
        const str = status.toString();
        const queryLength = parseInt(Object.keys(request.query).length);
        if (errors.isEmpty()) {
            if (queryLength === 3) {
                if (status && minPrice && maxPrice) {
                    const availableCars =  carsDB
                    .filter((car) =>  str === 'available' && car.price >= parseFloat(minPrice) && car.price <= parseFloat(maxPrice));
                    if (availableCars.length > 0) {
                        response.status(200).json({
                            status: 200,
                            data: availableCars
                        });
                    }
                    response.status(404).json({
                        status: 404,
                        data: 'Not Found'
                    });
                }
            }
            else if (queryLength === 2) {
                 if (status && state) {
                    const newAvailableCars =  carsDB.filter((car) => car.status === status && car.state === state);
                    if (newAvailableCars.length > 0) {
                        response.status(200).json({
                            status: 200,
                            data: newAvailableCars
                        });
                    }
                    response.status(404).json({
                        status: 404,
                        data: 'Not Found'
                    });
                }
            }
            else if (queryLength === 1) {
                if (status) {
                    const str = status.toString();
                    const availableCars =  carsDB.filter((car) => car.status === str);
                    if (availableCars.length > 0) {
                        return response.status(200).json({
                            status: 200,
                            data: availableCars
                        });
                    }
                    response.status(404).json({
                        data: 'not found'
                    });
                }
            }
            else if (admin) {
                return response.status(200).json({
                    status: 200,
                    message: 'admin',
                    data: carsDB
                });
            }
            response.status(404).json({
                status: 404,
                message: 'Search Not Found'
            });
        }
        response.status(401).json({
            success: false,
            error: errors.array()
          });
    }
    static specificCar(request, response) {
        const { carId } = request.params;
        const parsedId = parseInt(carId, 10);
        const car = carsDB.filter((car) => car.id === parsedId);
        if (car.length > 0) {
            response.status(200).json({
                status: 200,
                data: car
            });
        }
        response.status(404).json({
            status: 404,
            data: 'Not Found'
        });
    }
    static deleteCarAd(request, response) {
        const { carId } = request.params;
        const parsedId = parseInt(carId, 10);
        const cars = carsDB.filter((car) => car.id !== parsedId);
        if (cars.length > 0 && carId <= carsDB.length) {
            response.status(301).json({
                status: 301,
                data: `Vehicle with carID:${carId} was successfully deleted`
            });
        }
        response.status(404).json({
            status: 404,
            data: 'Not Found'
        });
    }
    static postCarAd(request, response) {
        const queryLength = parseInt(Object.keys(request.query).length, 10);
        const { owner, email, createdOn, price, status, manufacturer, model, bodyType, carImage} = request.body;
        const createdCarAd = {id:1, owner, email, createdOn, price, status, manufacturer, model, bodyType, carImage};
        if (createdCarAd && queryLength === 0) {
            response.status(201).json({
                status: 201,
                data: createdCarAd
            });
        }
        response.status(404).json({
            status: 404,
            data: 'Not Found'
        });
    }
    static changeAdPrice(request, response) {
        const queryLength = parseInt(Object.keys(request.query).length, 10);
        const { carId, price } = request.params;
        const parsedId = parseInt(carId, 10);
        const parsedPrice = parseFloat(price);
        const adTobeModified = carsDB.filter((car) => car.id === parsedId);
        const modifiedAd = adTobeModified.map((object) => {
            object.price = parsedPrice;
            return object;
        });
        if (modifiedAd && queryLength === 0) {
            response.status(202).json({
                status: 202,
                data: modifiedAd
            });
        }
        response.status(404).json({
            status: 404,
            data: 'Not Found'
        });
    }
}
export default Cars;