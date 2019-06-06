import { validationResult } from 'express-validator/check';
import carsDB from '../models/cars';
import users from '../models/users';
import { check } from 'express-validator/check';
const admin = users.find(user => user.isAdmin === true);
class Cars {
	static getCarOrCars(request, response) {
		let queryParams = request.query;
		let arrayOfQueryParams = Object.keys(queryParams);
		let queryLength = Object.keys(queryParams).length;
		let { status, state, minPrice, maxPrice } = queryParams;
		let stateIsDefined = arrayOfQueryParams.includes('state');
		let statusAndStateAreDefined = arrayOfQueryParams.includes('state', 'status');
		let priceRange = arrayOfQueryParams.includes('status', 'minPrice', 'maxPrice');
		if (queryLength === 0) {
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
		if (priceRange && queryLength === 3) {
			check('status')
			.isLength({ min: 4 })
			.trim().not().isEmpty().isString();
			check('minPrice').not().isEmpty().exists().isFloat().trim().escape();
			check('maxPrice').not().isEmpty().exists().isFloat().trim().escape();
			const errors = validationResult(request);
			if(!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			if(status === 'available') {
				const data = carsDB.filter((vehicle) => vehicle.price >= minPrice && vehicle.price <= maxPrice);
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
			response.status(422).json({
				status: 422,
				error: 'status should be available'
			});
		}
		if (stateIsDefined && queryLength === 1) {
			check('state')
			.isLength({ min: 3 })
			.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if(!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			if (state === 'new') {
				const data = carsDB.filter((vehicle) => vehicle.state === state);
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
			if (state === 'used') {
				const data = carsDB.filter((vehicle) => vehicle.state === state);
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
			response.status(422).json({
				status: 422,
				error: 'state should be used 0r new'
			});
		}
		if (statusAndStateAreDefined && queryLength === 2) {
			check('status')
			.isLength({ min: 4 })
			.trim().not().isEmpty().isString();
			check('state')
			.isLength({ min: 3 })
			.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if(!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			if (status === 'available') {
				const data = carsDB.filter((vehicle) => vehicle.state === state && vehicle.status === status);
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
			response.status(422).json({
				status: 422,
				error: 'status should be available'
			});
		}
		response.status(400).json({
			status: 400,
			error: 'Check your params'
		});
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
				response.status(301).json({
					status: 301,
					data: `Car Ad: ${ carId } successfully deleted`
				});
			}
			response.status(404).json({
				status: 404,
				error: 'Not Found'
			});
		}
	}
	static changeCarAdPrice(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { price } = request.body;
		const { carId } = request.params;
		const parsedPrice = parseFloat(price);
		const parsedCarId = parseInt(carId);
		const carAdToBeModified = carsDB.find(
			vehicle => vehicle.id === parsedCarId
		);
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
		if (carAdToBeModified) {
			const data = { ...carAdToBeModified, price: parsedPrice };
			response.status(202).json({
				status: 202,
				data
			});
		}
		response.status(404).json({
			status: 404,
			message: 'Not Found'
		});
	}
	static changeCarAdStatus(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const { status } = request.body;
		const { carId } = request.params;
		const parsedCarId = parseInt(carId);
		const carAdToBeModified = carsDB.find(
			vehicle => vehicle.id === parsedCarId
		);
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
		if (carAdToBeModified) {
			if (status === 'sold') {
				const data = { ...carAdToBeModified, status };
				response.status(202).json({
					status: 202,
					data
				});
			}
			response.status(400).json({
				status: 400,
				error: 'You can only mark car as SOLD'
			});
		}
		response.status(404).json({
			status: 404,
			message: 'Not Found'
		});
	}
}
export default Cars;
