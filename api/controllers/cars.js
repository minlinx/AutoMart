import CarsModel from '../models/cars';
class Cars {
	static async getCarOrCars(request, response, next) {
		const token = request.token || request.headers.token;
		const queryParams = request.query;
		const arrayOfQueryParams = Object.keys(queryParams);
		const queryLength = Object.keys(queryParams).length;
		const { status, state, min_price, max_price, body_type, manufacturer } = queryParams;
		const stateIsDefined = arrayOfQueryParams.includes('state');
		const statusIsDefined = arrayOfQueryParams.includes('status');
		const manufacturerIsDefined = arrayOfQueryParams.includes('manufacturer', 'status');
		const bodyTypeIsDefined = arrayOfQueryParams.includes('body_type');
		const statusAndStateAreDefined = arrayOfQueryParams.includes('state', 'status');
		const priceRange = arrayOfQueryParams.includes('status', 'min_price', 'max_price');
		if (token && queryLength === 0) {
			try {
				const carDatabaseResult = await CarsModel.getAll();
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else if (priceRange && queryLength === 3) {
			try {
				const carDatabaseResult = await CarsModel.getCarsWithinPriceRange(status, min_price, max_price);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else if (stateIsDefined && queryLength === 1) {
			try {
				const carDatabaseResult = await CarsModel.getCarsByState(state);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else if (statusIsDefined && queryLength === 1) {
			try {
				const carDatabaseResult = await CarsModel.getCarsByStatus(status);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else if (statusAndStateAreDefined && queryLength === 2) {
			try {
				const carDatabaseResult = await CarsModel.getCarsByStatusAndState(state, status);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else if (manufacturerIsDefined && queryLength === 2) {
			try {
				const carDatabaseResult = await CarsModel.getCarsByStatusAndManufacturer(manufacturer, status);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else if (bodyTypeIsDefined && queryLength === 1) {
			try {
				const carDatabaseResult = await CarsModel.getCarsByBodyType(body_type);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
		else {
			return await next();
		}
	}
	static async specificCar(request, response, next) {
		const token = request.token || request.headers.token;
		const { car_id } = request.params;
		const parsedCarId = Number(car_id);
		if (car_id && token) {
			try {
				const carDatabaseResult = await CarsModel.getSpecificCar(parsedCarId);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(200).json({
						status: 200,
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
			}
		}
	}
	static async postCarAd(request, response, next) {
		const img_url = (request.file.secure_url);
		const id = request.user.id;
		const parsedId = Number(id);
		const token = request.token || request.headers.token;
		const {
			status,
			manufacturer,
			model,
			body_type,
			price,
			state
		} = request.body;
		const parsedPrice = Number(price);
		if (
			manufacturer &&
			model &&
			body_type &&
			parsedPrice &&
			state &&
			status === 'available' &&
			parsedId &&
			token
		) {
			try {
				const carDatabaseResult = await CarsModel.postCarAd(parsedId, state, status, parsedPrice, manufacturer, model, body_type, img_url);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
					return await response.status(201).json({
						status: 201,
						data
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
		else {
			return await next();
		}
	}
	static async deleteCarAd(request, response, next) {
		// const { adminToken } = response.locals;
		const token = request.token || request.headers.token;
		const { car_id } = request.params;
		const parsedCarId = Number(car_id);
		if (
			parsedCarId && token
		) {
			try {
				const carDatabaseResult = await CarsModel.deleteCarAd(parsedCarId);
				if (carDatabaseResult.rowCount > 0) {
					const data = `Car Ad ${parsedCarId} Successfully Deleted`;
					return await response.status(301).json({
						status: 301,
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
			}
		}
	}
	static async changeCarAdPrice(request, response, next) {
		const token = request.token || request.headers.token;
		const { price } = request.body;
		const id = request.user.id;
		const parsedId = Number(id);
		const { car_id } = request.params;
		const parsedPrice = Number(price);
		const parsedCarId = parseInt(car_id);
		if (
			token && parsedId && parsedPrice
		) {
			try {
				const carDatabaseResult = await CarsModel.changeCarAdPrice(parsedPrice, parsedCarId, parsedId);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
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
			}
		}
	}
	static async changeCarAdStatus(request, response, next) {
		const token = request.token || request.headers.token;
		const { status } = request.body;
		const id = request.user.id;
		const parsedId = Number(id);
		const { car_id } = request.params;
		const parsedCarId = Number(car_id);
		if (
			parsedId && token && status === 'sold'
		) {
			try {
				const carDatabaseResult = await CarsModel.changeCarAdStatus(parsedCarId, parsedId);
				if (carDatabaseResult.rowCount > 0) {
					const data = [...carDatabaseResult.rows];
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
			}
		}
		else {
			return await next();
		}
	}
}
export default Cars;
