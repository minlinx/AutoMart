import { validationResult } from 'express-validator/check';
import carsDB from '../models/cars';
import users from '../models/users';
const admin = users.find(user => user.isAdmin === true);
class Cars {
	static getCarsWithStatus(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { status } = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (status) {
			const data = carsDB.filter(vehicle => vehicle.status === status);
			if (data.length > 0) {
				response.status(200).json({
					status: 200,
					data
				});
			}
			response.status(404).json({
				status: 404,
				error: 'Not Found'
			});
		}
	}
	static getCarsWithBodyType(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { bodyType } = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (bodyType) {
			const data = carsDB.filter(vehicle => vehicle.bodyType === bodyType);
			if (data.length > 0) {
				response.status(200).json({
					status: 200,
					data
				});
			}
			response.status(404).json({
				status: 404,
				error: 'Not Found'
			});
		}
	}
	static getCarsWithinAPriceRance(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { status, minPrice, maxPrice } = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (status && minPrice && maxPrice) {
			const data = carsDB.filter(
				vehicle =>
					vehicle.status === 'available' &&
					(minPrice <= vehicle.price && maxPrice >= vehicle.price)
			);
			if (data.length > 0) {
				response.status(200).json({
					status: 200,
					data
				});
			}
			response.status(404).json({
				status: 400,
				error: 'Not Found'
			});
		}
	}
	static getAllCars(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (admin) {
			const data = carsDB;
			if (data.length > 0) {
				response.status(200).json({
					status: 200,
					data
				});
			}
			response.status(404).json({
				status: 400,
				error: 'Not Found'
			});
		}
	}
	static getCarsWithStatusAndState(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { status, state } = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (status && state) {
			const data = carsDB.filter(
				vehicle => vehicle.status === status && vehicle.state === state
			);
			if (data.length > 0) {
				response.status(200).json({
					status: 200,
					data
				});
			}
			response.status(404).json({
				status: 404,
				error: 'Not Found'
			});
		}
	}
	static specificCar(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { carId } = request.params;
		const parsedCarId = parseInt(carId, 10);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (carId) {
			const data = carsDB.find(vehicle => vehicle.id === parsedCarId);
			if (data) {
				response.status(200).json({
					status: 200,
					data
				});
			}
			response.status(404).json({
				status: 404,
				error: 'Not Found'
			});
		}
	}
	static postCarAd(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const {
			id,
			email,
			manufacturer,
			model,
			price,
			state,
			status
		} = request.body;
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (
			id &&
			email &&
			manufacturer &&
			model &&
			model &&
			price &&
			state &&
			status
		) {
			const url = (request.file.url);
			const data = { id, email, createdOn: Date(), manufacturer, model, price, state, status, image: url };
			response.status(201).json({
				status: 201,
				data
			});
		}
	}
	static deleteCarAd(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const { carId } = request.params;
		const parsedCarId = parseInt(carId, 10);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (carId) {
			const data = carsDB.find(vehicle => vehicle.id === parsedCarId);
			if (data) {
				response.status(200).json({
					status: 200,
					data: `Car Ad: ${ carId } successfully deleted`
				});
			}
			response.status(404).json({
				status: 404,
				error: 'Not Found'
			});
		}
	}
	static changeAdPriceOrStatus(request, response) {
		const regularExpression = /^(\d+\.?\d*)$/;
		const queryLength = parseInt(Object.keys(request.query).length, 10);
		const { carId, param } = request.params;
		const parsedId = parseInt(carId, 10);
		const parsedPrice = parseFloat(param);
		const adTobeModified = carsDB.find(car => car.id === parsedId);
		const booleanValue = regularExpression.test(param);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			response.status(422).json({
				status: 422,
				error: errors.array()
			});
		}
		if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		if (booleanValue && adTobeModified) {
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
		}
		if (param === 'sold') {
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
