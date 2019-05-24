import { validationResult } from 'express-validator/check';
import carsDB from '../models/cars';
import users from '../models/users';
const admin = users.filter(user => user.isAdmin === true);
class Cars {
	static cars(request, response) {
		const { status, state, minPrice, maxPrice } = request.query;
		const queryLength = parseInt(Object.keys(request.query).length);
		if (queryLength >= 3) {
			const errors = validationResult(request);
			if (errors.isEmpty() && status && minPrice && maxPrice) {
				const availableCars = carsDB.filter(
					car =>
						status === 'available' &&
						car.price >= parseFloat(minPrice) &&
						car.price <= parseFloat(maxPrice)
				);
				if (availableCars.length > 0) {
					response.status(200).json({
						status: 200,
						data: availableCars
					});
				}
				response.status(404).json({
					status: 404,
					error: 'Not Found'
				});
			}
			response.status(422).json({
				status: 422,
				errors: errors.array()
			});
		} else if (queryLength === 2) {
			if (status && state) {
				const newAvailableCars = carsDB.filter(
					car => car.status === status && car.state === state
				);
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
		} else if (queryLength === 1) {
			if (status) {
				const str = status.toString();
				const availableCars = carsDB.filter(car => car.status === str);
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
		} else if (admin) {
			return response.status(200).json({
				status: 200,
				data: carsDB
			});
		}
		response.status(404).json({
			status: 404,
			message: 'Search Not Found'
		});
	}
	static specificCar(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { carId } = request.params;
		const parsedId = parseInt(carId, 10);
		const car = carsDB.find(car => car.id === parsedId);
		if (car && queryLength === 0) {
			response.status(200).json({
				status: 200,
				data: car
			});
		}
		response.status(404).json({
			status: 404,
			error: 'Not Found'
		});
	}
	static deleteCarAd(request, response) {
		const { carId } = request.params;
		const parsedId = parseInt(carId, 10);
		const car = carsDB.find(car => car.id === parsedId);
		if (car && carId <= carsDB.length) {
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
		const {
			owner,
			email,
			createdOn,
			price,
			status,
			manufacturer,
			model,
			bodyType,
			carImage
		} = request.body;
		const createdCarAd = {
			id: 1,
			owner,
			email,
			createdOn: new Date(createdOn),
			price,
			status,
			manufacturer,
			model,
			bodyType,
			carImage
		};
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (errors.isEmpty() && createdCarAd && queryLength === 0) {
			response.status(201).json({
				status: 201,
				data: createdCarAd
			});
		}
		response.status(400).json({
			status: 400,
			error: 'Bad Request'
		});
	}
	static changeAdPriceOrStatus(request, response) {
		const regularExpression = /^(\d+\.?\d*)$/;
		const queryLength = parseInt(Object.keys(request.query).length, 10);
		const { carId, param } = request.params;
		const parsedId = parseInt(carId, 10);
		const parsedPrice = parseFloat(param);
		const adTobeModified = carsDB.find(car => car.id === parsedId);
		const booleanValue = regularExpression.test(param);
		if (booleanValue) {
			const modifiedAd = { ...adTobeModified, price: parsedPrice };
			if (modifiedAd && queryLength === 0) {
				response.status(202).json({
					status: 202,
					data: modifiedAd
				});
			}
			response.status(400).json({
				status: 400,
				error: 'Bad Request'
			});
		} else if (
			queryLength === 0 &&
			(param === 'available' || param === 'sold')
		) {
			const modifiedAd = { ...adTobeModified, status: param };
			response.status(202).json({
				status: 202,
				message: 'welcome',
				data: modifiedAd
			});
		}
		response.status(400).json({
			status: 400,
			error: 'Bad Request'
		});
	}
}
export default Cars;
