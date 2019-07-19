import { validationResult } from 'express-validator/check';
import pool from '../../dbConifg';
import { check } from 'express-validator/check';
class Cars {
	static async getCarOrCars(request, response, next) {
		console.log('get all cars', request);
		const token = request.token || request.headers.token;
		console.log('getall', token);
		const queryParams = request.query;
		const arrayOfQueryParams = Object.keys(queryParams);
		const queryLength = Object.keys(queryParams).length;
		console.log(queryLength, 'querylength all  cars routes');
		const { status, state, min_price, max_price, body_type, manufacturer } = queryParams;
		const stateIsDefined = arrayOfQueryParams.includes('state');
		const statusIsDefined = arrayOfQueryParams.includes('status');
		const manufacturerIsDefined = arrayOfQueryParams.includes('manufacturer', 'status');
		const bodyTypeIsDefined = arrayOfQueryParams.includes('body_type');
		const statusAndStateAreDefined = arrayOfQueryParams.includes('state', 'status');
		const priceRange = arrayOfQueryParams.includes('status', 'min_price', 'max_price');
		if (token && queryLength === 0) {
			pool.connect()
				.catch(error => {
					if (error) {
						console.log('from all cars', error);
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'SELECT * FROM cars';
					return pool.query(sql);
				})
				.catch(error => {
					if (error) {
						console.log('from all cars', error);
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
						const data = [...result.rows, token];
						console.log('get all', data);
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
			check('min_price').not().isEmpty().exists().isFloat().trim().escape();
			check('max_price').not().isEmpty().exists().isFloat().trim().escape();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: 'Unprocessable Entity'
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: '***server is down***'
							});
						}
					})
					.then(() => {
						const sql = 'SELECT * FROM cars WHERE status=$1 AND price>=$2 AND price<=$3 AND status=$4';
						const param = [status, min_price, max_price, 'available'];
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
								error: 'Not Found',
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
		else if (stateIsDefined && queryLength === 1) {
			check('state')
				.isLength({ min: 3 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: 'Unprocessable Entity'
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
						const sql = 'SELECT * FROM cars WHERE (state=$1)  AND (state=$2 OR state=$3) AND status=$4';
						const param = [state, 'new', 'used', 'available'];
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
								error: 'Not Found',
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
		else if (statusIsDefined && queryLength === 1) {
			check('status')
				.isLength({ min: 3 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: 'Unprocessable Entity'
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
						const sql = 'SELECT * FROM cars WHERE status=$1';
						const param = [status];
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
								error: 'Not Found',
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
					error: 'Unprocessable Entity'
				});
			}
			else if (errors.isEmpty()) {
				pool.connect()
					.catch(error => {
						if (error) {
							return response.status(500).json({
								status: 500,
								error: '***server is down***'
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
								error: 'Not Found',
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
					error: 'Unprocessable Entity'
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
								error: 'Not Found',
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
		else if (bodyTypeIsDefined && queryLength === 1) {
			check('body_type')
				.isLength({ min: 3 })
				.trim().not().isEmpty().isString();
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				response.status(422).json({
					status: 422,
					error: 'Unprocessable Entity'
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
						const sql = 'SELECT * FROM cars WHERE body_type=$1  AND status=$2';
						const param = [body_type, 'available'];
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
								error: 'Not Found',
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
			return response.status(400).json({
				status: 400,
				error: 'Bad Request'
			});
		}
	}
	static async specificCar(request, response, next) {
		const token = request.token || request.headers.token;
		console.log('From specific car', token);
		const queryLength = parseInt(Object.keys(request.query).length);
		const { car_id } = request.params;
		const parsedCarId = Number(car_id);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: 'Unprocessable Entity'
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (car_id && token) {
			pool.connect()
				.catch(error => {
					if (error) {
						console.log('from specific cars', error);
						return response.status(505).json({
							status: 505,
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
					console.log('from specific cars', error);
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
							error: 'Not Found',
						});
					}
					else {
						const data = { ...result.rows[0], token };
						console.log('specific data', data);
						return response.status(200).json({
							status: 200,
							data
						});
					}
				});
		}
		else {
			return response.status(400).json({
				status: 400,
				error: 'Bad requests'
			});
		}
	}
	static async postCarAd(request, response, next) {
		const id = request.user.id;
		const parsedId = Number(id);
		console.log(parsedId);
		const token = request.token || request.headers.token;
		const queryLength = parseInt(Object.keys(request.query).length);
		const {
			status,
			manufacturer,
			model,
			body_type,
			price,
			state
		} = request.body;
		const parsedPrice = Number(price);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: 'Unprocessable Entity'
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			manufacturer &&
			model &&
			body_type &&
			parsedPrice &&
			state &&
			status === 'available' &&
			parsedId &&
			token &&
			errors.isEmpty()
		) {
			pool.connect()
				.catch(error => {
					console.log('from postcarad', error);
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const createdOn = new Date();
					// const url = (request.file.secure_url);
					const img_url = 'https://res.cloudinary.com/min-automart/image/upload/v1562696499/min-automart-images/1562696490671car5.jpg.jpg';
					const sql = 'INSERT INTO cars (owner, created_on, state, status, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
					const params = [parsedId, createdOn, state, status, parsedPrice, manufacturer, model, body_type, img_url];
					return pool.query(sql, params);
				})
				.catch(error => {
					console.log('from postcarad', error);
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
							error: 'Not Found',
						});
					}
					else {
						// const { car_image } = { ...result.rows[0] };
						// const img_url = car_image;
						const data = { ...result.rows[0], token };
						// const data = { manufacturer, model, state, status, parsedId };
						console.log('post car data', data);
						return response.status(201).json({
							status: 201,
							data
						});
					}
				});
		}
		else {
			return response.status(400).json({
				status: 400,
				error: 'Bad Request'
			});
		}
	}
	static async deleteCarAd(request, response, next) {
		// const { adminToken } = response.locals;
		const token = request.token || request.headers.token;
		const queryLength = parseInt(Object.keys(request.query).length);
		const { car_id } = request.params;
		const parsedCarId = Number(car_id);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: 'Unprocessable Entity'
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			parsedCarId && token
		) {
			pool.connect()
				.catch(error => {
					console.log('From delete', error);
					if (error) {
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'DELETE FROM cars WHERE id=$1';
					const param = [parsedCarId];
					return pool.query(sql, param);
				})
				.catch(error => {
					console.log('delete', error);
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
							error: 'Not Found',
						});
					}
					else {
						console.log('From delete', result.rows[0]);
						return response.status(200).json({
							status: 200,
							data: 'Car Ad successfully deleted',
							token
						});
					}
				});
		}
		else {
			return response.status(422).json({
				status: 422,
				error: 'Unauthorized'
			});
		}
	}
	static async changeCarAdPrice(request, response, next) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const token = request.token || request.headers.token;
		const { price } = request.body;
		console.log(['patch price', price]);
		const id = request.user.id;
		const parsedId = Number(id);
		const { car_id } = request.params;
		const parsedPrice = Number(price);
		const parsedCarId = parseInt(car_id);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: 'Unprocessable Entity'
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			token && parsedId
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						console.log('From change car price', error);
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'UPDATE cars SET price=$1 WHERE id=$2 AND owner=$3 RETURNING *';
					const param = [parsedPrice, parsedCarId, parsedId];
					return pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						console.log('FRom chage car price', error);
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
							error: 'Not Found',
						});
					}
					else {
						const data = { ...result.rows[0], token };
						console.log('updata car price', data);
						return response.status(202).json({
							status: 202,
							data
						});
					}
				});
		}
		else {
			response.status(400).json({
				status: 400,
				error: 'Bad Request'
			});
		}
	}
	static async changeCarAdStatus(request, response, next) {
		const queryLength = parseInt(Object.keys(request.query).length);
		const errors = validationResult(request);
		const token = request.token || request.headers.token;
		const { status } = request.body;
		const id = request.user.id;
		const parsedId = Number(id);
		const { car_id } = request.params;
		const parsedCarId = Number(car_id);
		if (!errors.isEmpty()) {
			return response.status(422).json({
				status: 422,
				error: 'Unprocessable Entity'
			});
		}
		else if (queryLength > 0) {
			return response.status(400).json({
				status: 400,
				error: 'No Query Params'
			});
		}
		else if (
			parsedId && token && status === 'sold'
		) {
			pool.connect()
				.catch(error => {
					if (error) {
						console.log('FRom chage car status', error);
						return response.status(500).json({
							status: 500,
							error: '***server is down***'
						});
					}
				})
				.then(() => {
					const sql = 'UPDATE cars SET status=$1 WHERE id=$2 AND owner=$3 RETURNING *';
					const param = ['sold', parsedCarId, parsedId];
					return pool.query(sql, param);
				})
				.catch(error => {
					if (error) {
						console.log('FRom chage car status', error);
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
							error: 'Not Found',
						});
					}
					else {
						const data = { ...result.rows[0], token };
						console.log('status change', data);
						return response.status(202).json({
							status: 202,
							data
						});
					}
				});
		}
		else {
			return response.status(400).json({
				status: 422,
				error: 'Bad Request'
			});
		}
	}
}
export default Cars;
