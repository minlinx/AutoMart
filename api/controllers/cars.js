import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';
import carsDB from '../models/cars';
import { check } from 'express-validator/check';
class Cars {
	static getCarOrCars(request, response) {
		const queryParams = request.query;
		const arrayOfQueryParams = Object.keys(queryParams);
		const queryLength = Object.keys(queryParams).length;
		const { status, state, minPrice, maxPrice, bodyType, manufacturer } = queryParams;
		const stateIsDefined = arrayOfQueryParams.includes('state');
		const manufacturerIsDefined = arrayOfQueryParams.includes('manufacturer');
		const bodyTypeIsDefined = arrayOfQueryParams.includes('bodyType');
		const statusAndStateAreDefined = arrayOfQueryParams.includes('state', 'status');
		const priceRange = arrayOfQueryParams.includes('status', 'minPrice', 'maxPrice');
		if (queryLength === 0) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then(() => {
					const sql = 'SELECT * FROM users WHERE is_admin=$1';
					const param = [true];
					return pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then(result => {
					if (result) {
						const sql = 'SELECT * FROM cars';
						return pool.query(sql);
					}
				})
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then((result) => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							error: 'Database is empty'
						});
					}
					else {
						const data = [...result.rows];
						return response.status(200).json({
							status: 200,
							data
						});
					}
				});
		}
		else if (priceRange && queryLength === 3) {
			check('status')
				.isLength({ min: 4 })
				.trim().not().isEmpty().isString();
			check('minPrice').not().isEmpty().exists().isFloat().trim().escape();
			check('maxPrice').not().isEmpty().exists().isFloat().trim().escape();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: 'server is down'
							});
						}
					})
					.then(() => {
						const sql = 'SELECT * FROM cars WHERE status=$1 AND price>=$2 AND price<=$3';
						const param = [status, minPrice, maxPrice];
						return pool.query(sql, param);
					})
					.catch(error => {
						if (error) {
							return response.status(400).json({
								status: 400,
								error: 'Check your inputs'
							});
						}
					})
					.then(result => {
						if (!result.rowCount > 0) {
							return response.status(404).json({
								status: 404,
								message: 'Not Found',
							});
						}
						else {
							const data = [...result.rows];
							return response.status(200).json({
								status: 200,
								data
							});
						}
					});
			}
			// if (status === 'available') {
			// 	const data = carsDB.filter((vehicle) => vehicle.price >= parsedMinPrice && vehicle.price <= parsedMaxPrice);
			// 	console.log(data);
			// 	if (data.length > 0) {
			// 		response.status(200).json({
			// 			status: 200,
			// 			data
			// 		});
			// 	}
			// 	response.status(404).json({
			// 		status: 404,
			// 		error: 'Not Found'
			// 	});
			// }
			// response.status(422).json({
			// 	status: 422,
			// 	error: 'status should be available'
			// });
		}
		else if (stateIsDefined && queryLength === 1) {
			check('state')
				.isLength({ min: 3 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: 'server is down'
							});
						}
					})
					.then(() => {
						const sql = 'SELECT * FROM cars WHERE (state=$1)  AND (state=$2 OR state=$3)';
						const param = [state, 'new', 'used'];
						return pool.query(sql, param);
					})
					.catch(error => {
						if (error) {
							return response.status(400).json({
								status: 400,
								error: 'Check your inputs'
							});
						}
					})
					.then(result => {
						if (!result.rowCount > 0) {
							return response.status(404).json({
								status: 404,
								message: 'Not Found',
							});
						}
						else {
							const data = [...result.rows];
							return response.status(200).json({
								status: 200,
								data
							});
						}
					});
			}
		}
		else if (statusAndStateAreDefined && queryLength === 2) {
			check('status')
				.isLength({ min: 4 })
				.trim().not().isEmpty().isString();
			check('state')
				.isLength({ min: 3 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: 'server is down'
							});
						}
					})
					.then(() => {
						const sql = 'SELECT * FROM cars WHERE (state=$1)  AND status=$2 AND status=$3';
						const param = [state, status, 'available'];
						return pool.query(sql, param);
					})
					.catch(error => {
						if (error) {
							return response.status(400).json({
								status: 400,
								error: 'Check your inputs'
							});
						}
					})
					.then(result => {
						if (!result.rowCount > 0) {
							return response.status(404).json({
								status: 404,
								message: 'Not Found',
							});
						}
						else {
							const data = [...result.rows];
							return response.status(200).json({
								status: 200,
								data
							});
						}
					});
			}
		}
		else if (manufacturerIsDefined && queryLength === 2) {
			check('manufacturer').not().isEmpty()
				.isLength({ min: 4 })
				.trim().isString();
			check('status')
				.isLength({ min: 4 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: 'server is down'
							});
						}
					})
					.then(() => {
						const sql = 'SELECT * FROM cars WHERE manufacturer=$1  AND status=$2 AND status=$3';
						const param = [manufacturer, status, 'available'];
						return pool.query(sql, param);
					})
					.catch(error => {
						if (error) {
							return response.status(400).json({
								status: 400,
								error: 'Check your inputs'
							});
						}
					})
					.then(result => {
						if (!result.rowCount > 0) {
							return response.status(404).json({
								status: 404,
								message: 'Not Found',
							});
						}
						else {
							const data = [...result.rows];
							return response.status(200).json({
								status: 200,
								data
							});
						}
					});
			}
		}
		else if (bodyTypeIsDefined && queryLength === 2) {
			check('bodyType')
				.isLength({ min: 3 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: errors.array()
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: 'server is down'
							});
						}
					})
					.then(() => {
						const sql = 'SELECT * FROM cars WHERE body_type=$1  AND status=$2 AND status=$3';
						const param = [bodyType, status, 'available'];
						return pool.query(sql, param);
					})
					.catch(error => {
						if (error) {
							return response.status(400).json({
								status: 400,
								error: 'Check your inputs'
							});
						}
					})
					.then(result => {
						if (!result.rowCount > 0) {
							return response.status(404).json({
								status: 404,
								message: 'Not Found',
							});
						}
						else {
							const data = [...result.rows];
							return response.status(200).json({
								status: 200,
								data
							});
						}
					});
			}
		}
		else {
			response.status(400).json({
				status: 400,
				error: 'Check your params'
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
		else if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (errors.isEmpty()) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then(() => {
					const sql = 'SELECT * FROM cars WHERE id=$1';
					const param = [parsedCarId];
					return pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(result => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							message: 'Not Found',
						});
					}
					else {
						const data = [...result.rows];
						return response.status(200).json({
							status: 200,
							data
						});
					}
				});
		}
	}
	static postCarAd(request, response) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const {
			id,
			owner,
			email,
			manufacturer,
			model,
			bodyType,
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
		else if (queryLength > 0) {
			response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			id &&
			email &&
			owner &&
			manufacturer &&
			model &&
			bodyType &&
			price &&
			state &&
			status &&
			errors.isEmpty()
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						return response.status(500).json({
							status: 500,
							error: 'server is down'
						});
					}
				})
				.then(() => {
					const createdOn = '15-6-2019';
					const url = (request.file.url);
					const sql = 'INSERT INTO cars (id, owner, created_on, state, status, price, manufacturer, model, body_type, car_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10)';
					const params = [id, owner, createdOn, state, status, price, manufacturer, model, bodyType, url];
					return pool.query(sql, params);
				})
				.catch(error => {
					if (error) {
						return response.status(400).json({
							status: 400,
							error: 'Check your inputs'
						});
					}
				})
				.then(result => {
					if (!result.rowCount > 0) {
						return response.status(404).json({
							status: 404,
							message: 'Not Found',
						});
					}
					else {
						return response.status(201).json({
							status: 201,
							message: 'Car AD successfully created'
						});
					}
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
					data: `Car Ad: ${carId} successfully deleted`
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
